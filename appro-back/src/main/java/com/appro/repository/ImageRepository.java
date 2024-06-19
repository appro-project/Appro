package com.appro.repository;

import com.appro.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> deleteAllByPathIn(List<String> imageUrls);

    Image deleteByPath(String path);
}
