package com.appro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
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
    private BigDecimal area;

    @Column(name = "height")
    private BigDecimal height;

    @Column(name = "planning_image")
    private String planningImage;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

}

