package com.appro.service;

import com.appro.entity.Image;
import org.springframework.web.multipart.MultipartFile;

public interface S3BucketService {

    String upload(MultipartFile file, Image image);

    void delete(Image image);
}
