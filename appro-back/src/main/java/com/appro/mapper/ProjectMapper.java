package com.appro.mapper;

import com.appro.dto.ProjectDto;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import com.appro.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {ProjectOptionsMapper.class, ImageMapper.class, FloorMapper.class})
public interface ProjectMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "floors", ignore = true)
    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "stringToWallMaterialOptions")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "stringToFoundationOptions")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "stringToCeilingOptions")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "stringToInsulationOptions")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "stringToRoofOptions")
    @Mapping(target = "style", source = "style", qualifiedByName = "stringToStyleOptions")
    @Mapping(target = "images", ignore = true)
    void updateProjectFromDto(@MappingTarget Project project, ProjectDto projectDto);

    default void update(Project project, ProjectDto projectDto, Image mainImage, List<Image> images, List<Floor> floors) {
        updateProjectFromDto(project, projectDto);
        updateImages(project, mainImage, images);
        updateFloors(project, floors);
    }

    default void updateImages(Project project, Image mainImage, List<Image> images) {
        List<Image> existingImages = project.getImages() == null ?
                List.of() :
                project.getImages();

        if (existingImages.isEmpty()) {
            existingImages = new ArrayList<>();
            project.setImages(existingImages);
        } else {
            Set<Integer> newImageIds = images.stream()
                    .map(Image::getId)
                    .collect(Collectors.toSet());

            existingImages.removeIf(existingImage ->
                    !"main".equals(existingImage.getType()) &&
                    !newImageIds.contains(existingImage.getId())
            );
        }

        if (mainImage != null) {
            existingImages.removeIf(image -> "main".equals(image.getType()));
            mainImage.setType("main");
            mainImage.setProject(project);
            existingImages.add(mainImage);
        }

        Set<Integer> existingImageIds = existingImages.stream()
                .map(Image::getId)
                .collect(Collectors.toSet());

        for (Image newImage : images) {
            if (!existingImageIds.contains(newImage.getId())) {
                newImage.setProject(project);
                existingImages.add(newImage);
            }
        }
    }

    default void updateFloors(Project project, List<Floor> floors) {
        List<Floor> existingFloors = project.getFloors() == null ? List.of() : project.getFloors();

        if (existingFloors.isEmpty()) {
            existingFloors = new ArrayList<>();
            project.setFloors(existingFloors);
        } else {
            Set<Integer> floorsIds = floors.stream().map(Floor::getId).collect(Collectors.toSet());
            existingFloors.removeIf(floor -> !floorsIds.contains(floor.getId()));
        }

//        for (Floor floor : floors) {
//            floor.setProject(project);
//            existingFloors.add(floor);
//        }

        for (Floor floor : floors) {
            floor.setProject(project);
            if (floor.getPlanningImage() != null) {
                floor.getPlanningImage().setProject(project);
            }
            existingFloors.add(floor);
        }
    }

    @Mapping(target = "wallMaterial", source = "project.wallMaterial", qualifiedByName = "optionWallMaterialToString")
    @Mapping(target = "insulation", source = "project.insulation", qualifiedByName = "optionInsulationToString")
    @Mapping(target = "foundation", source = "project.foundation", qualifiedByName = "optionFoundationToString")
    @Mapping(target = "ceiling", source = "project.ceiling", qualifiedByName = "optionCeilingToString")
    @Mapping(target = "roof", source = "project.roof", qualifiedByName = "optionRoofToString")
    @Mapping(target = "style", source = "project.style", qualifiedByName = "optionStyleToString")
    @Mapping(target = "id", source = "project.id")
    @Mapping(target = "mainImage", source = "images", qualifiedByName = "findMainImage")
    @Mapping(target = "images", source = "images", qualifiedByName = "toImageInfoListFilterByTypeImage")
    @Mapping(target = "photos", source = "images", qualifiedByName = "toImageInfoListFilterByTypePhoto")
    ProjectDto toProjectDto(Project project);

    @Named("findMainImage")
    default Image findMainImage(List<Image> images) {
        if (images == null) return null;
        return images.stream()
                .filter(image -> "main".equals(image.getType()))
                .findFirst()
                .orElse(null);
    }

    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "optionWallMaterialToString")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "optionInsulationToString")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "optionFoundationToString")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "optionCeilingToString")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "optionRoofToString")
    @Mapping(target = "style", source = "style", qualifiedByName = "optionStyleToString")
    List<ProjectDto> toProjectsDto(List<Project> projects);

}
