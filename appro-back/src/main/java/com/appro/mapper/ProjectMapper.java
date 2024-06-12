package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.dto.ProjectDto;
import com.appro.dto.ProjectDtoFullInfo;
import com.appro.entity.Image;
import com.appro.entity.Project;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = ProjectOptionsMapper.class)
public interface ProjectMapper {

    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "optionWallMaterialToString")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "optionInsulationToString")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "optionFoundationToString")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "optionCeilingToString")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "optionRoofToString")
    @Mapping(target = "style", source = "style", qualifiedByName = "optionStyleToString")
    @Mapping(target = "mainImage", source = "mainImage", qualifiedByName = "imageToUrl")
    ProjectDto toProjectDto(Project project);

    @Named("imageToUrl")
    static String imageToUrl(Image image) {
        return image != null ? image.getPath() : "";
    }

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
    @Mapping(target = "mainImage", ignore = true) // todo check it
    Project toProject(ProjectDto projectDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "stringToWallMaterialOptions")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "stringToFoundationOptions")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "stringToCeilingOptions")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "stringToInsulationOptions")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "stringToRoofOptions")
    @Mapping(target = "style", source = "style", qualifiedByName = "stringToStyleOptions")
    @Mapping(target = "mainImage", ignore = true) // todo check it
    Project update(@MappingTarget Project originProject, ProjectDto projectDto);
}
