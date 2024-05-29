package com.appro.repository.projection;

import java.math.BigDecimal;
import java.util.List;

public interface ProjectProjection {
    Integer getId();
    String getTitle();
    String getDescription();
    BigDecimal getPopularity();
    BigDecimal getGeneralArea();
    BigDecimal getTimeToCreate();
    BigDecimal getProjectPrice();
    BigDecimal getLivingArea();
    BigDecimal getBuildingArea();
    String getWallMaterial();
    BigDecimal getWallThickness();
    String getFoundation();
    String getCeiling();
    String getRoof();
    BigDecimal getBuildingPrice();
    String getInsulation();
    BigDecimal getInsulationThickness();
    BigDecimal getLength();
    BigDecimal getWidth();
    String getStyle();
    Boolean getIsGaragePresent();
    BigDecimal getBedroomCount();
    ImageProjection getMainImage();
    List<ImageProjection> getImages();
    ProjectConfigProjection getProjectConfig();

}

