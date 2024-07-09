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

        if (existingFloors.isEmpty()) {
            existingFloors = new ArrayList<>();
            project.setFloors(existingFloors);
        } else {
            Set<Integer> floorsIds = floors.stream().map(Floor::getId).collect(Collectors.toSet());
            existingFloors.removeIf(floor -> !floorsIds.contains(floor.getId()));
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
//    List<Floor> existingFloors = project.getFloors() == null ? new ArrayList<>() : new ArrayList<>(project.getFloors());
//
//    if (floors == null) {
//        // Якщо floors == null, відв'язуємо всі поверхи та їх зображення
//        for (Floor floor : existingFloors) {
//            floor.setProject(null);
//            if (floor.getPlanningImage() != null) {
//                floor.getPlanningImage().setProject(null);
//            }
//        }
//        existingFloors.clear();
//    } else {
//        Set<Integer> floorsIds = floors.stream().map(Floor::getId).collect(Collectors.toSet());
//
//        // Видаляємо поверхи, яких немає в новому списку
//        existingFloors.removeIf(floor -> {
//            boolean toRemove = !floorsIds.contains(floor.getId());
//            if (toRemove) {
//                floor.setProject(null);
//                if (floor.getPlanningImage() != null) {
//                    floor.getPlanningImage().setProject(null);
//                }
//            }
//            return toRemove;
//        });
//
//        // Оновлюємо або додаємо нові поверхи
//        for (Floor newFloor : floors) {
//            Optional<Floor> existingFloorOpt = existingFloors.stream()
//                    .filter(floor -> floor.getId().equals(newFloor.getId()))
//                    .findFirst();
//
//            if (existingFloorOpt.isPresent()) {
//                Floor existingFloor = existingFloorOpt.get();
//                existingFloor.setArea(newFloor.getArea());
//                existingFloor.setHeight(newFloor.getHeight());
//                existingFloor.setIndex(newFloor.getIndex());
//                existingFloor.setIsAttic(newFloor.getIsAttic());
//                existingFloor.setIsBasement(newFloor.getIsBasement());
//                existingFloor.setPlanningImage(newFloor.getPlanningImage());
//
//                if (existingFloor.getPlanningImage() != null) {
//                    existingFloor.getPlanningImage().setProject(project);
//                }
//            } else {
//                newFloor.setProject(project);
//                if (newFloor.getPlanningImage() != null) {
//                    newFloor.getPlanningImage().setProject(project);
//                }
//                existingFloors.add(newFloor);
//            }
//        }
//    }
//
//    project.setFloors(existingFloors);
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
