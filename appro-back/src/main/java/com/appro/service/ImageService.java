package com.appro.service;

import com.appro.dto.ImageDto;
import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import com.appro.entity.Project;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

    Image getById(int id);

    List<ImageInfo> saveImages(List<MultipartFile> files);

    ImageDto saveFloorImage(int projectId, int floorId, MultipartFile file);

    void removeImages(List<Image> images);

    void removeImage(String path);

    void saveImagesToDb(List<Image> images);
}
