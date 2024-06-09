package com.appro.repository;

import com.appro.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FloorRepository extends JpaRepository<Floor, Integer> {

    @Query("SELECT f FROM Floor f WHERE f.project.id = :projectId")
    List<Floor> findFloorsBtProjectId(@Param("projectId") int projectId);
}
