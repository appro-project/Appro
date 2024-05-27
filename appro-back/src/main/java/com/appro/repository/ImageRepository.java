package com.appro.repository;

import com.appro.entity.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ProjectImage, Integer> {
}
