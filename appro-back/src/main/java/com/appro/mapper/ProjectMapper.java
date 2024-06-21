package com.appro.mapper;

import com.appro.dto.ProjectDto;
import com.appro.entity.Image;
import com.appro.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProjectOptionsMapper.class, ImageMapper.class, FloorMapper.class})
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


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "stringToWallMaterialOptions")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "stringToFoundationOptions")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "stringToCeilingOptions")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "stringToInsulationOptions")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "stringToRoofOptions")
    @Mapping(target = "style", source = "style", qualifiedByName = "stringToStyleOptions")
    Project update(@MappingTarget Project project, ProjectDto projectDto);


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
    Project toProject(ProjectDto projectDto);

}
