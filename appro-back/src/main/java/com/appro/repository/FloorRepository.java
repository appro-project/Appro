package com.appro.repository;

import com.appro.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface FloorRepository extends JpaRepository<Floor, Integer> {

}
