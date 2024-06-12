package com.appro.service;

import com.appro.dto.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    ImageDto saveMainImage(int projectId, MultipartFile file);

    List<ImageDto> savePhotos(int projectid, List<MultipartFile> files);

    List<ImageDto> saveImages(int projectid, List<MultipartFile> files);

    ImageDto saveFloorImage(int projectId, int floorId, MultipartFile file);
}
