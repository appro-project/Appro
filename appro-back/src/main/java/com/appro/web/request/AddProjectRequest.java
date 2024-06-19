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
    private ProjectConfigDto projectConfig;
    private ImageInfo mainImage;
    private List<ImageInfo> images;
    private List<ImageInfo> photos;
}
