package com.appro.entity.project_options;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StyleOptions {

    MODERN("современный"),
    CLASSIC("классический");

    private final String style;

    @JsonCreator
    public static StyleOptions fromValue(String value) {
        for (StyleOptions option : StyleOptions.values()) {
            if (option.getStyle().equalsIgnoreCase(value)) {
                return option;
            }
        }
        throw new IllegalArgumentException("Unknown style option: " + value);
    }

    @JsonValue
    public String toValue() {
        return this.style;
    }
}
