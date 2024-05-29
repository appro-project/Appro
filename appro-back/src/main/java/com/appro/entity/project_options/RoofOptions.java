package com.appro.entity.project_options;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoofOptions {
    BITUMEN_TILE("битумная черепица"),
    METAL_TILE("металлочерепица"),
    PROFILED_SHEETING("профнастил"),
    REBATE("фальцевая"),
    FLAT("плоская"),
    TILE("черепица"),
    SLATE("сланцевая");

    private final String roof;

    @JsonCreator
    public static RoofOptions fromValue(String value) {
        for (RoofOptions option : RoofOptions.values()) {
            if (option.getRoof().equalsIgnoreCase(value)) {
                return option;
            }
        }
        throw new IllegalArgumentException("Unknown roof option: " + value);
    }

    @JsonValue
    public String toValue() {
        return this.roof;
    }
}
