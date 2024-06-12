package com.appro.service;

import org.springframework.web.multipart.MultipartFile;

public interface S3BucketService {

    String upload(MultipartFile file);

}
