package com.appro.dto;


import com.appro.entity.project_options.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    private BigDecimal popularity;
    private BigDecimal generalArea;
    private BigDecimal timeToCreate;
    private BigDecimal projectPrice;
    private BigDecimal livingArea;
    private BigDecimal buildingArea;
    private String wallMaterial;
    private BigDecimal wallThickness;
    private String foundation;
    private String ceiling;
    private String roof;
    private BigDecimal buildingPrice;
    private String insulation;
    private BigDecimal insulationThickness;
    private BigDecimal length;
    private BigDecimal width;
    private String style;
    private Boolean isGaragePresent;
    private BigDecimal bedroomCount;
    private ImageDto mainImage;
    private ProjectConfigDto projectConfig;
}
