package com.appro.service;

import com.appro.dto.ImageDto;
import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

    Image findById(int id);

    List<ImageInfo> saveImages(List<MultipartFile> files, String type);

    Image save(Image image);

    List<Image> processNewAndOldImages(List<ImageInfo> newImages, List<Image> oldImages);

    Image findMainImage(int projectId);

    ImageDto saveFloorImage(int projectId, int floorId, MultipartFile file);

    void removeImages(List<ImageInfo> imageInfos);

}
