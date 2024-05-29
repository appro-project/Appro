package com.appro.entity.project_options;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum InsulationOptions {

    MINERAL_WOOL("минеральная вата"),
    EXPANDED_POLYSTYRENE("пенополистерол"),
    FIBREBOARD("фибролит"),
    FOAM_PLASTIC("пенопласт");

    private final String insulationOption;

    @JsonCreator
    public static InsulationOptions fromValue(String value) {
        for (InsulationOptions option : InsulationOptions.values()) {
            if (option.getInsulationOption().equalsIgnoreCase(value)) {
                return option;
            }
        }
        throw new IllegalArgumentException("Unknown insulation option: " + value);
    }

    @JsonValue
    public String toValue() {
        return this.insulationOption;
    }
}
