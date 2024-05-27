package com.appro.entity;

import com.appro.entity.project_options.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.PrePersist;

import lombok.Setter;
import lombok.Getter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLRestriction;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project")
@SQLRestriction(value = "is_deleted = false")
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

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @OneToOne
    @JoinColumn(name = "main_image_id")
    private ProjectImage mainImage;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectImage> images;

    @OneToOne
    @JoinColumn(name = "project_config_id")
    private ProjectConfig projectConfig;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        isDeleted = false;
    }

}

