package com.appro.service.impl;

import com.appro.dto.ProjectDto;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.ProjectMapper;
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

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> findAll(String sortBy, String sortDirection) {
        Direction direction = Direction.fromString(sortDirection);

        if (isSortableField(sortBy)) {
            return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(Sort.Order.desc(sortBy))));
        }
        return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(direction, CREATED_AT)));
    }

    private boolean isSortableField(String sortBy) {
        return SORTABLE_FIELDS.contains(sortBy);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDto findById(int id) {
        Project project = findProjectById(id);
        return projectMapper.toProjectDto(project);
    }

    @Override
    @Transactional
    public ProjectDto create(ProjectDto projectDto) {
        //validateProject(projectDto);
        Project project = projectMapper.toProject(projectDto);
        return saveProject(project);
    }

    @Override
    @Transactional
    public ProjectDto update(int id, ProjectDto projectDto) {
        validateProject(projectDto);
        Project originProject = findProjectById(id);
        Project updatedProject = projectMapper.update(originProject, projectDto);

        return saveProject(updatedProject);
    }

    private Project findProjectById(int id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    private ProjectDto saveProject(Project project) {
        return projectMapper.toProjectDto(projectRepository.save(project));
    }

    private void validateProject(ProjectDto projectDto) {}

}
