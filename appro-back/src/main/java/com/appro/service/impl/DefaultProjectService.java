package com.appro.service.impl;

import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ProjectRepository;
import com.appro.service.ImageService;
import com.appro.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.BeanFactory;
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
    private final ImageService imageService;

    private final BeanFactory beanFactory;


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
        Project currentProject;
        if (projectDto.getId() == null) {
            Project project = projectMapper.toProject(projectDto);  // is deleted = null
            currentProject = projectRepository.save(project);
        } else {
            Project project = projectRepository.findById(projectDto.getId()).orElseThrow(() -> new ProjectNotFoundException(projectDto.getId()));
            currentProject = projectMapper.update(project, projectDto);
        }

        // 1. save main image
        ImageInfo mainImageInfo = projectDto.getMainImage();
        Image mainImage = null;
        if (mainImageInfo != null) {
            mainImage = imageService.findById(mainImageInfo.getId());
            mainImage.setType("main");
            mainImage.setProject(currentProject);
        }

        // 2. save images
        List<ImageInfo> newImages = projectDto.getImages();
        List<Image> currentImages = currentProject.getImages().stream().filter(image -> image.getType().equals("image")).toList();
        List<Image> imagesToAdd = imageService.processNewAndOldImages(newImages, currentImages);

        imagesToAdd.forEach(imageInfo -> {
            Image image = imageService.findById(imageInfo.getId());
            image.setProject(currentProject);
            imageService.save(image);
        });

        // 3. save photos
        Project projectToSave = projectRepository.save(currentProject);

        return projectMapper.toProjectDto(projectToSave);
    }

    @Override
    @Transactional
    public ProjectDto updateProject(int id, ProjectDto projectDto) {
        ProjectService proxyServer = beanFactory.getBean(ProjectService.class);
        return proxyServer.create(projectDto);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Project project = findProjectById(id);
        project.setIsDeleted(true);
        projectRepository.save(project);
    }


    @Override
    public Project findProjectById(int id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDto findProjectFullInfo(int id) {
        return projectMapper.toProjectDto(findProjectById(id));
    }

    private boolean isSortableField(String sortBy) {
        return sortBy != null && SORTABLE_FIELDS.contains(sortBy);
    }

}
