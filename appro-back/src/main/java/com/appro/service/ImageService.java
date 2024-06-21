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

    // newImage => [1,2,4]
    // oldImages => [1,2,3]
    // remove 3 from everywhere
    // link 4 to project
    List<Image> imagesFilter(List<ImageInfo> newImages, List<Image> oldImages);

    ImageDto saveFloorImage(int projectId, int floorId, MultipartFile file);

    void removeImages(List<Image> images);

    void removeImage(String path);

    void saveImagesToDb(List<Image> images);
}
