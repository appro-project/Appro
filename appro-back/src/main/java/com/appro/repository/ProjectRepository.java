package com.appro.repository;

import com.appro.entity.Project;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @EntityGraph(attributePaths = {"images", "floors"})
    Optional<Project> findById(int id);
}
