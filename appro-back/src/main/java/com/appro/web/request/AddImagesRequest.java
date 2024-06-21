package com.appro.web.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record AddImagesRequest(
        List<MultipartFile> images,
        String type) {
}
