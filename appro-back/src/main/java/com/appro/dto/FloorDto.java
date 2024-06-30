package com.appro.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

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

    private ImageInfo planningImage;

}


