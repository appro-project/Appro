package com.appro.dto;

import com.appro.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FloorDto {
    private Integer id;

    private BigDecimal index;

    private Boolean isAttic;

    private Boolean isBasement;

    private BigDecimal area;

    private BigDecimal height;

    private String planningImage;

    private Project project;
}


