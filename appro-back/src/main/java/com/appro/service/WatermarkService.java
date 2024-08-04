package com.appro.service;

import org.springframework.web.multipart.MultipartFile;

public interface WatermarkService {

    MultipartFile addWatermark(MultipartFile sourceImage);
}
