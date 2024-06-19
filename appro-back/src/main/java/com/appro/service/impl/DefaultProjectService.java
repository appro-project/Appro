package com.appro.service.impl;

import com.appro.dto.*;
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
import com.appro.web.request.AddProjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    public ProjectDto create(AddProjectRequest projectDto) {
        Project project = projectMapper.toProject(projectDto);

        // 1. save main image
        ImageInfo mainImageInfo = projectDto.getMainImage();
        Image mainImage = null;
        if (mainImageInfo != null) {
            mainImage = imageService.findById(mainImageInfo.getId());
            mainImage.setType("main");
            mainImage.setProject(project);
        }

        // 2. save images
        List<ImageInfo> newImages = projectDto.getImages();
        List<Image> currentImages = project.getImages().stream().filter(image -> image.getType().equals("image")).toList();
        List<ImageInfo> imagesToAdd = updateImages(newImages, currentImages);
        imagesToAdd.forEach(imageInfo -> {
            Image image = imageService.findById(imageInfo.getId());
            image.setType("image");
            image.setProject(project);
        });

        // 3. save photos
        Project projectToSave = projectRepository.save(project);

        return customProjectMapper.toProjectDto(projectToSave, mainImage, imagesToAdd);
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


    // newImage => [1,2,4]
    // oldImages => [1,2,3]
    // remove 3 from everywhere
    // link 4 to project
    List<ImageInfo> updateImages(List<ImageInfo> newImages, List<Image> oldImages) {
        List<ImageInfo> toAdd = new ArrayList<>();
        List<Image> toRemove = new ArrayList<>();

        newImages.forEach(newImage -> {
            if (oldImages.stream().noneMatch(i -> i.getId() == newImage.getId())) {
                toAdd.add(newImage);
            }
        });

        oldImages.forEach(oldImage -> {
            if (newImages.stream().noneMatch(i -> i.getId() == oldImage.getId())) {
                toRemove.add(oldImage);
            }
        });

        imageService.removeImages(toRemove);

        return toAdd;

    }





    private ProjectDto applyProjectChanges(Project project) {
        return projectMapper.toProjectDto(projectRepository.save(project));
    }

    private boolean isSortableField(String sortBy) {
        return sortBy != null && SORTABLE_FIELDS.contains(sortBy);
    }

}
