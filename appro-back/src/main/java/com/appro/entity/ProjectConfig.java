package com.appro.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_config")
public class ProjectConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "project_config_seq")
    @SequenceGenerator(name = "project_config_seq", sequenceName = "project_config_id_seq", allocationSize = 1)
    private Integer projectId;

    @Column(name = "show_on_main")
    private Boolean showOnMain;

    @Column(name = "is_finished")
    private Boolean isFinished;

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

}