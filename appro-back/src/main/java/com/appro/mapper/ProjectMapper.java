package com.appro.mapper;

import com.appro.dto.ProjectDto;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import com.appro.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.*;
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
        updateImages(project, images);
        updateMainImage(project, mainImage);
        updateFloors(project, floors);
    }

    default void updateImages(Project project, List<Image> images) {
        List<Image> currentImages = project.getImages();
        if (currentImages == null) {
            currentImages = new ArrayList<>();
            project.setImages(currentImages);
        }

        Map<Integer, Image> newImageMap = images.stream()
                .collect(Collectors.toMap(Image::getId, image -> image));

        List<Image> imagesToRemove = new ArrayList<>(currentImages);
        imagesToRemove.removeIf(image -> newImageMap.containsKey(image.getId()) || "main".equals(image.getType()));

        for (Image image : imagesToRemove) {
            image.setProject(null);
        }

        currentImages.clear();

        for (Image image : images) {
            if (!"main".equals(image.getType())) {
                image.setProject(project);
            }
            currentImages.add(image);
        }

        project.setImages(currentImages);
    }

    default void updateMainImage(Project project, Image mainImage) {
        List<Image> existingImages = project.getImages();

        if (mainImage != null) {
            existingImages.removeIf(image -> "main".equals(image.getType()));

            mainImage.setType("main");
            mainImage.setProject(project);
            existingImages.add(mainImage);

            project.setImages(existingImages);
        }
    }

    default void updateFloors(Project project, List<Floor> floors) {
        List<Floor> existingFloors = project.getFloors() == null ? List.of() : project.getFloors();
//        List<Image> projectImages = project.getImages() == null ? new ArrayList<>() : project.getImages();

//        if (floors != null) {
//            Set<Integer> floorsIds = floors.stream().map(Floor::getId).collect(Collectors.toSet());
//            existingFloors.removeIf(floor -> !floorsIds.contains(floor.getId()));
//        }
        List<Floor> floorsToRemove = new ArrayList<>();
        if (floors != null) {
            Set<Integer> floorsIds = floors.stream().map(Floor::getId).collect(Collectors.toSet());
            floorsToRemove = existingFloors.stream()
                    .filter(floor -> !floorsIds.contains(floor.getId()))
                    .collect(Collectors.toList());
            existingFloors.removeAll(floorsToRemove);
//            floorsToRemove.forEach(floor -> floor.getPlanningImage().setProject(null));
        }

        for (Floor floor : floors) {
            floor.setProject(project);
            if (floor.getPlanningImage() != null) {
                floor.getPlanningImage().setProject(project);
            }
            existingFloors.add(floor);
        }
    }
//default void updateFloors(Project project, List<Floor> floors) {
//    List<Floor> existingFloors = project.getFloors() == null ? new ArrayList<>() : project.getFloors();
//    List<Image> projectImages = project.getImages() == null ? new ArrayList<>() : project.getImages();
//
//    if (floors != null) {
//        Set<Integer> floorsIds = floors.stream().map(Floor::getId).collect(Collectors.toSet());
//        existingFloors.removeIf(floor -> !floorsIds.contains(floor.getId()));
//    }
//
//    for (Floor floor : floors) {
//        floor.setProject(project);
//        Image planningImage = floor.getPlanningImage();
//        if (planningImage != null) {
//            planningImage.setProject(project);
//
////            // Перевіряємо, чи існує зображення в проекті, якщо ні - додаємо
////            if (!projectImages.contains(planningImage)) {
//                projectImages.add(planningImage);
//           // }
//        }
//        existingFloors.add(floor);
//    }
//
//    // Оновлюємо список зображень проекту, видаляючи ті, що більше не належать жодному поверху
//    projectImages.removeIf(image -> floors.stream()
//            .map(Floor::getPlanningImage)
//            .noneMatch(img -> img != null && img.equals(image)));
//
//    project.setFloors(existingFloors);
//    project.setImages(projectImages);
//}


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
        if (images == null)
            return null;
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
