package com.appro.entity;

import com.appro.entity.project_options.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Builder
@ToString
//@DynamicInsert
//@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "popularity")
    private BigDecimal popularity;

    @Column(name = "general_area")
    private BigDecimal generalArea;

    @Column(name = "living_area")
    private BigDecimal livingArea;

    @Column(name = "building_area")
    private BigDecimal buildingArea;

    @Column(name = "time_to_create")
    private BigDecimal timeToCreate;

    @Column(name = "project_price")
    private BigDecimal projectPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "wall_material")
    private WallMaterialOptions wallMaterial;

    @Column(name = "wall_thickness")
    private BigDecimal wallThickness;

    @Enumerated(EnumType.STRING)
    @Column(name = "foundation")
    private FoundationOptions foundation;

    @Enumerated(EnumType.STRING)
    @Column(name = "ceiling")
    private CeilingOptions ceiling;

    @Enumerated(EnumType.STRING)
    @Column(name = "roof")
    private RoofOptions roof;

    @Column(name = "building_price")
    private BigDecimal buildingPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "insulation")
    private InsulationOptions insulation;

    @Column(name = "insulation_thickness")
    private BigDecimal insulationThickness;

    @Column(name = "length")
    private BigDecimal length;

    @Column(name = "width")
    private BigDecimal width;

    @Enumerated(EnumType.STRING)
    @Column(name = "style")
    private StyleOptions style;

    @Column(name = "is_garage_present")
    private Boolean isGaragePresent;

    @Column(name = "bedroom_count")
    private Integer bedroomCount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

}

