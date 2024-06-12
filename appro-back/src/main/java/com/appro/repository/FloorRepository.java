package com.appro.repository;

import com.appro.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface FloorRepository extends JpaRepository<Floor, Integer> {

    @Query("SELECT f FROM Floor f JOIN FETCH f.project p WHERE p.id = :project AND f.id = :floor")
    Floor findFloor(@Param("project") int project, @Param("floor") int floor);

}
