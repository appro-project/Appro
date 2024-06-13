package com.appro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FloorDto {
    private Integer id;

    private Integer index;

    private Boolean isAttic;

    private Boolean isBasement;

    private Double area;

    private Double height;

    //private String planningImage;

    private Integer projectId;
}


