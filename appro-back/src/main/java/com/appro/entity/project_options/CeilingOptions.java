package com.appro.entity.project_options;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CeilingOptions {
    COMBINED("комбинированная"),
    WOOD("дерево"),
    IRON_CONCRETE("сборное ж/б из плит"),
    MONOLITHIC("монолитная ж/б плита");

    private final String ceiling;

    @JsonCreator
    public static CeilingOptions fromValue(String value) {
        for (CeilingOptions ceil : CeilingOptions.values()) {
            if (ceil.getCeiling().equalsIgnoreCase(value)) {
                return ceil;
            }
        }
        throw new IllegalArgumentException("Unknown ceiling material: " + value);
    }

    @JsonValue
    public String toValue() {
        return this.ceiling;
    }
}

