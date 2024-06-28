package com.appro.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FloorDto {
    private Integer id;

    private Integer index;

    private Boolean isAttic;

    private Boolean isBasement;

    private Double area;

    private Double height;

    private String planningImage;

//    private Integer projectId;
}


