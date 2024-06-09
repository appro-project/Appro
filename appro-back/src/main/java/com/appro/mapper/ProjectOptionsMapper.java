package com.appro.mapper;

import com.appro.entity.project_options.*;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ProjectOptionsMapper {
    @Named("optionInsulationToString")
    static String optionToString(InsulationOptions insulation) {
        return insulation.toValue();
    }

    @Named("optionWallMaterialToString")
    static String optionToString(WallMaterialOptions wallMaterial) {
        return wallMaterial.toValue();
    }

    @Named("optionFoundationToString")
    static String optionToString(FoundationOptions foundation) {
        return foundation.toValue();
    }

    @Named("optionCeilingToString")
    static String optionToString(CeilingOptions ceiling) {
        return ceiling.toValue();
    }

    @Named("optionRoofToString")
    static String optionToString(RoofOptions roof) {
        return roof.toValue();
    }

    @Named("optionStyleToString")
    static String optionToString(StyleOptions style) {
        return style.toValue();
    }

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
}
