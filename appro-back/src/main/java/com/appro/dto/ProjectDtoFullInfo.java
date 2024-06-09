package com.appro.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDtoFullInfo {
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
    private Integer bedroomCount;

    private ImageDto mainImage;
    private ProjectConfigDto projectConfig;

    private List<ImageDto> images;
    private List<FloorDto> floors;
}
