package com.appro.service.impl;

import com.appro.dto.*;
import com.appro.entity.Project;
import com.appro.entity.ProjectConfig;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.mapper.ProjectConfigMapper;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ProjectConfigRepository;
import com.appro.repository.ProjectRepository;
import com.appro.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class DefaultProjectService implements ProjectService {

    private static final List<String> SORTABLE_FIELDS = List.of("popularity", "generalArea", "projectPrice");

    private static final String CREATED_AT = "createdAt";

    private final ProjectConfigRepository configRepository;
    private final ProjectRepository projectRepository;

    private final ProjectConfigMapper configMapper;
    private final ProjectMapper projectMapper;
    private final FloorMapper floorMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> findAll(String sortBy, String sortDirection) {
        Direction direction = Direction.fromString(sortDirection);

        if (isSortableField(sortBy)) {
            return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(Sort.Order.desc(sortBy))));
        }
        return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(direction, CREATED_AT)));
    }

    @Override
    @Transactional
    public ProjectDto create(ProjectDto projectDto) {
        Project project = projectMapper.toProject(projectDto);
        return applyProjectChanges(project);
    }

    @Override
    @Transactional
    public ProjectDto updateProject(int id, ProjectDto projectDto) {
        Project originProject = findProjectById(id);
        Project updatedProject = projectMapper.update(originProject, projectDto);

        return applyProjectChanges(updatedProject);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Project project = findProjectById(id);
        project.setIsDeleted(true);
        projectRepository.save(project);
    }

    @Override
    @Transactional
    public ProjectDto updateConfig(int id, ProjectConfigDto projectConfig) {
        Project project = findProjectById(id);
        ProjectConfig config = configMapper.toProjectConfig(projectConfig);

        configRepository.save(config);
        project.setProjectConfig(config);

        return applyProjectChanges(project);
    }

    @Override
    public Project findProjectById(int id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDtoFullInfo findProjectFullInfo(int id) {
        Project project = findProjectById(id);
        List<FloorDto> floorDtoList = floorMapper.toFloorsDto(project.getFloors());

        return projectMapper.toProjectDtoFullInfo(project, floorDtoList);
    }


    private ProjectDto applyProjectChanges(Project project) {
        return projectMapper.toProjectDto(projectRepository.save(project));
    }

    private boolean isSortableField(String sortBy) {
        return sortBy != null && SORTABLE_FIELDS.contains(sortBy);
    }

}
