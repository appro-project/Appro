package com.appro.service;

import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

    Image findById(int id);

    List<ImageInfo> saveImages(List<MultipartFile> files, String type);

    Image getImageFromDtoOrExisting(ImageInfo imageInfo);

    void removeImages(List<ImageInfo> imageInfos);

}
