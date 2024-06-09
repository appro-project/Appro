package com.appro.repository;

import com.appro.entity.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @EntityGraph(attributePaths = {"images"})
    Project findProjectWithImagesById(int id);

    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.mainImage LEFT JOIN FETCH p.images LEFT JOIN FETCH p.projectConfig WHERE p.id = :projectId")
    Project findProjectById(@Param("projectId") int projectId);

}
