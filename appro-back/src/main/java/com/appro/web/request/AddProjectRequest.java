package com.appro.web.request;

import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectConfigDto;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class AddProjectRequest {
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
    private ProjectConfigDto projectConfig;
    private ImageInfo mainImage;
    private List<ImageInfo> images;
    private List<ImageInfo> photos;
}
