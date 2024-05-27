package com.appro.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_image")
public class ProjectImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "path")
    private String path;

    @Column(name = "is_main")
    private Boolean isMain;

    @Column(name = "is_photo")
    private Boolean isPhoto;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    // Getters and Setters
}

