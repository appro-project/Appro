package com.appro.entity.project_options;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum WallMaterialOptions {

    BRICK("кирпич"),
    GAS_BLOCK("газоблок"),
    FOAM_BLOCK("пеноблок"),
    CERAMIC_BLOCK("керамоблок");

    private final String wallMaterial;

    @JsonCreator // To convert json value in enum
    public static WallMaterialOptions fromValue(String value) {
        for (WallMaterialOptions option : WallMaterialOptions.values()) {
            if (option.getWallMaterial().equalsIgnoreCase(value)) {
                return option;
            }
        }
        throw new IllegalArgumentException("Unknown wall material: " + value);
    }

    @JsonValue
    public String toValue() {
        return this.wallMaterial;
    }
}
