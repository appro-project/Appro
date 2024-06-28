package com.appro.repository;

import com.appro.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface FloorRepository extends JpaRepository<Floor, Integer> {

    @Query("SELECT f FROM Floor f JOIN FETCH f.project p WHERE p.id = :project AND f.id = :floor")
    Floor findFloor(@Param("project") int project, @Param("floor") int floor);

    @Query("SELECT f FROM Floor f WHERE f.id = :floorId AND f.project.id = :projectId")
    Optional<Floor> findByIdAndProjectId( @Param("floorId") int floorId, @Param("projectId") int projectId);

}
