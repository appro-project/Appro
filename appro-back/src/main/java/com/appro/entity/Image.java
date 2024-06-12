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
@AllArgsConstructor
@Table(name = "project_image")
public class Image {
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
    private Project project; // todo: do we need it?
}

