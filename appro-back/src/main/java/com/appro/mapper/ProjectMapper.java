package com.appro.mapper;

import com.appro.dto.ProjectDto;
import com.appro.entity.Project;
import com.appro.entity.project_options.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    ProjectDto toProjectDto(Project project);

    List<ProjectDto> toProjectsDto(List<Project> projects);

    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "stringToWallMaterialOptions")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "stringToFoundationOptions")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "stringToCeilingOptions")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "stringToInsulationOptions")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "stringToRoofOptions")
    @Mapping(target = "style", source = "style", qualifiedByName = "stringToStyleOptions")
    @Mapping(target = "createdAt", ignore = true)
    Project toProject(ProjectDto projectDto);

    @Named("stringToWallMaterialOptions")
    static WallMaterialOptions stringToWallMaterialOptions(String wallMaterial) {
        return WallMaterialOptions.fromValue(wallMaterial);
    }

    @Named("stringToFoundationOptions")
    static FoundationOptions stringToFoundationOptions(String foundation) {
        return FoundationOptions.fromValue(foundation);
    }

    @Named("stringToCeilingOptions")
    static CeilingOptions stringToCeilingOptions(String ceiling) {
        return CeilingOptions.fromValue(ceiling);
    }

    @Named("stringToInsulationOptions")
    static InsulationOptions stringToInsulationOptions(String insulation) {
        return InsulationOptions.fromValue(insulation);
    }

    @Named("stringToRoofOptions")
    static RoofOptions stringToRoofOptions(String roof) {
        return RoofOptions.fromValue(roof);
    }

    @Named("stringToStyleOptions")
    static StyleOptions stringToStyleOptions(String style) {
        return StyleOptions.fromValue(style);
    }


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "wallMaterial", source = "wallMaterial", qualifiedByName = "stringToWallMaterialOptions")
    @Mapping(target = "foundation", source = "foundation", qualifiedByName = "stringToFoundationOptions")
    @Mapping(target = "ceiling", source = "ceiling", qualifiedByName = "stringToCeilingOptions")
    @Mapping(target = "insulation", source = "insulation", qualifiedByName = "stringToInsulationOptions")
    @Mapping(target = "roof", source = "roof", qualifiedByName = "stringToRoofOptions")
    @Mapping(target = "style", source = "style", qualifiedByName = "stringToStyleOptions")
    Project update(@MappingTarget Project originProject, ProjectDto projectDto);
}
