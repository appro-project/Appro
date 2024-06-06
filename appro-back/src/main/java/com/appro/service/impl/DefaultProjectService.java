package com.appro.service.impl;

import com.appro.dto.ImageDto;
import com.appro.dto.ProjectConfigDto;
import com.appro.dto.ProjectDto;
import com.appro.entity.Project;
import com.appro.entity.ProjectConfig;
import com.appro.entity.Image;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.ImageMapper;
import com.appro.mapper.ProjectConfigMapper;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ImageRepository;
import com.appro.repository.ProjectConfigRepository;
import com.appro.repository.ProjectRepository;
import com.appro.repository.projection.ProjectProjection;
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
    private final ImageRepository imageRepository;

    private final ProjectConfigMapper configMapper;
    private final ProjectMapper projectMapper;
    private final ImageMapper imageMapper;

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
    @Transactional(readOnly = true)
    public ProjectProjection findProjectById(Integer projectId) {
        return projectRepository.findProjectById(projectId);
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
    public ProjectDto addMainImage(int projectId, ImageDto imageDto) {
        Project project = findProjectById(projectId);

        Image image = imageMapper.toImage(imageDto);
        image.setProject(project);

        imageRepository.save(image);

        project.setMainImage(image);
        return applyProjectChanges(project);
    }

    @Override
    @Transactional
    public ProjectDto addImagesToProject(int projectId, List<ImageDto> imageDtos) {
        Project project = projectRepository.findProjectWithImagesById(projectId);

        List<Image> images = imageMapper.toImagesList(imageDtos);
        images.forEach(image -> image.setProject(project));

        project.getImages().addAll(images);

        imageRepository.saveAll(images);

        return applyProjectChanges(project);
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


    private Project findProjectById(int id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    private ProjectDto applyProjectChanges(Project project) {
        return projectMapper.toProjectDto(projectRepository.save(project));
    }

    private boolean isSortableField(String sortBy) {
        return sortBy != null && SORTABLE_FIELDS.contains(sortBy);
    }

}
