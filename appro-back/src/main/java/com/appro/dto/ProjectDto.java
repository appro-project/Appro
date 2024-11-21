package com.appro.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.List;


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
    private Double terraceArea;
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
    private ImageInfo mainImage;
    private Boolean showOnMain;
    private Boolean isFinished;
    private List<ImageInfo> images;
    private List<ImageInfo> photos;
    private List<FloorDto> floors;
}
