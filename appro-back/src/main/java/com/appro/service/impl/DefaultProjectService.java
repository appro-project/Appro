package com.appro.service.impl;

import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.CustomProjectMapper;
import com.appro.mapper.FloorMapper;
import com.appro.mapper.ProjectConfigMapper;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ProjectRepository;
import com.appro.service.ImageService;
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

    private final ProjectConfigMapper configMapper;
    private final ProjectMapper projectMapper;
    private final FloorMapper floorMapper;
    private final ImageService imageService;

    private final CustomProjectMapper customProjectMapper;


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
        List<Image> imagesToAdd = imageService.imagesFilter(newImages, currentImages);

        imagesToAdd.forEach(imageInfo -> {
            Image image = imageService.findById(imageInfo.getId());
            //image.setType("image");
            image.setProject(currentProject);
            imageService.save(image);
        });

        // 3. save photos
        Project projectToSave = projectRepository.save(currentProject);

        System.out.println(projectToSave.getImages()); // ????

        // todo: change it, u should pass images to add instead of current images
        return projectMapper.toProjectDto(projectToSave, mainImage, currentImages);
    }

    @Override
    @Transactional
    public ProjectDto updateProject(int id, ProjectDto projectDto) {
        return create(projectDto);
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
        Project project = findProjectById(id);

        Image mainImage = project.getImages().stream().filter(image -> image.getType().equals("main"))
                .findFirst().orElse(null);

        List<Image> images = project.getImages().stream().filter(image -> image.getType().equals("image")).toList();

        return projectMapper.toProjectDto(project, mainImage, images);
    }


    private boolean isSortableField(String sortBy) {
        return sortBy != null && SORTABLE_FIELDS.contains(sortBy);
    }

}
