package com.appro.dto;

import lombok.*;

import java.math.BigDecimal;


@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Integer id;
    private String title;
    private String description;
    private Integer popularity;
    private Double generalArea;
    private Integer timeToCreate;
    private BigDecimal projectPrice;
    private Double livingArea;
    private Double buildingArea;
    private String wallMaterial;
    private BigDecimal wallThickness;
    private String foundation;
    private String ceiling;
    private String roof;
    private BigDecimal buildingPrice;
    private String insulation;
    private Double insulationThickness;
    private Double length;
    private Double width;
    private String style;
    private Boolean isGaragePresent;
    private BigDecimal bedroomCount;
    private ImageInfo mainImage;
    private ImageInfo[] images;

}
