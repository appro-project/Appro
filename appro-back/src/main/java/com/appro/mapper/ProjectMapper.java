package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.dto.ProjectDtoFullInfo;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.web.request.AddProjectRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Context;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProjectOptionsMapper.class, ImageMapper.class})
public interface ProjectMapper {

    @Mapping(target = "wallMaterial", source = "project.wallMaterial", qualifiedByName = "optionWallMaterialToString")
    @Mapping(target = "insulation", source = "project.insulation", qualifiedByName = "optionInsulationToString")
    @Mapping(target = "foundation", source = "project.foundation", qualifiedByName = "optionFoundationToString")
    @Mapping(target = "ceiling", source = "project.ceiling", qualifiedByName = "optionCeilingToString")
    @Mapping(target = "roof", source = "project.roof", qualifiedByName = "optionRoofToString")
    @Mapping(target = "style", source = "project.style", qualifiedByName = "optionStyleToString")
    @Mapping(target = "id", source = "project.id")
    @Mapping(target = "images", source = "imagesInfoList", qualifiedByName = "toImageInfoList")
    ProjectDto toProjectDto(Project project, Image mainImage, List<Image> imagesInfoList);

//    @Mapping(source = "image", target = ".")
//    ImageInfo toImageInfo(Image image);
    //ProjectDto toProjectDto(Project project);


//    @Named("filterMainImage") // todo: finished it
//    static ImageInfo filterMainImage(List<Image> images) {
//        Image main = images.stream().filter(image -> image.getType().equals("main")).findFirst().orElse(null);
//        if (main != null) {
//            return new ImageInfo(main.getId(), main.getPath());
//        }
//        return null;
//    }

    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "optionWallMaterialToString")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "optionInsulationToString")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "optionFoundationToString")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "optionCeilingToString")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "optionRoofToString")
    @Mapping(target = "style", source = "style", qualifiedByName = "optionStyleToString")
    ProjectDtoFullInfo toProjectDtoFullInfo(Project project, @Context List<FloorDto> floors);

    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "optionWallMaterialToString")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "optionInsulationToString")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "optionFoundationToString")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "optionCeilingToString")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "optionRoofToString")
    @Mapping(target = "style", source = "style", qualifiedByName = "optionStyleToString")
    List<ProjectDto> toProjectsDto(List<Project> projects);


    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "stringToWallMaterialOptions")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "stringToFoundationOptions")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "stringToCeilingOptions")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "stringToInsulationOptions")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "stringToRoofOptions")
    @Mapping(target = "style", source = "style", qualifiedByName = "stringToStyleOptions")
    @Mapping(target = "createdAt", ignore = true)
    Project toProject(AddProjectRequest projectDto);

    Project tempMap(Project project);

//    @Named("filterImages") // todo: finished it
//    static List<Image> filterImages( List<Image> images, List<ImageInfo> mainImage) {
//        List<Image> filteredImages = images.stream().filter(image -> image.getType().equals("image")).toList();
//
//        //return filteredImages.stream().map(image -> new ImageInfo(image.getId(), image.getPath())).toList();
//        return List.of(new Image());
//    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "stringToWallMaterialOptions")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "stringToFoundationOptions")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "stringToCeilingOptions")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "stringToInsulationOptions")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "stringToRoofOptions")
    @Mapping(target = "style", source = "style", qualifiedByName = "stringToStyleOptions")
    @Mapping(target = "images", ignore = true)
        // todo check it
    Project update(@MappingTarget Project originProject, ProjectDto projectDto);
}
