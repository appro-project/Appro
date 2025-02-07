package com.appro.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.PrePersist;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

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
@EqualsAndHashCode(of = "id")
@Table(name = "project")
@SQLRestriction(value = "is_deleted = false")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description_ua")
    private String descriptionUA;

    @Column(name = "description_ru")
    private String descriptionRU;

    @Column(name = "popularity")
    private Integer popularity;

    @Column(name = "general_area")
    private Double generalArea;

    @Column(name = "living_area")
    private Double livingArea;

    @Column(name = "building_area")
    private Double buildingArea;

    @Column(name = "terrace_area")
    private Double terraceArea;

    @Column(name = "time_to_create")
    private Integer timeToCreate;

    @Column(name = "project_price")
    private BigDecimal projectPrice;

    @Column(name = "wall_material")
    private String wallMaterial;

    @Column(name = "wall_thickness")
    private BigDecimal wallThickness;

    private String foundation;

    private String ceiling;

    private String roof;

    @Column(name = "building_price")
    private BigDecimal buildingPrice;

    private String insulation;

    @Column(name = "insulation_thickness")
    private Double insulationThickness;

    @Column(name = "length")
    private Double length;

    @Column(name = "width")
    private Double width;

    private String style;

    @Column(name = "is_garage_present")
    private Boolean isGaragePresent;

    @Column(name = "bedroom_count")
    private Integer bedroomCount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "show_on_main")
    private Boolean showOnMain;

    @Column(name = "is_finished")
    private Boolean isFinished;

    @Column(name = "video_url")
    private String videoUrl;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.MERGE}, orphanRemoval = true)
    private List<Image> images;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.MERGE}, orphanRemoval = true)
    private List<Floor> floors;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        isDeleted = false;
    }

}

