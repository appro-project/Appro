package com.appro.repository;

import com.appro.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> deleteAllByPathIn(List<String> imageUrls);

    Image deleteByPath(String path);

    @Query("SELECT i FROM Image i WHERE i.type = 'main' AND i.project.id =:id")
    Optional<Image> findMainImageByProjectId(int id);
}
