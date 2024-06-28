package com.appro.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import lombok.*;


@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@EqualsAndHashCode(of="id")
@AllArgsConstructor
@Table(name = "floor")
public class Floor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "index")
    private Integer index;

    @Column(name = "is_attic")
    private Boolean isAttic;

    @Column(name = "is_basement")
    private Boolean isBasement;

    @Column(name = "area")
    private Double area;

    @Column(name = "height")
    private Double height;

    @Column(name = "planning_image")
    private String planningImage;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

}

