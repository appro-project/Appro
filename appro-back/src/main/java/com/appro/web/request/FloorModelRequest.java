package com.appro.web.request;

import org.springframework.web.multipart.MultipartFile;

public record FloorModelRequest(
        //int id,
        int index,
        boolean isAttic,
        boolean isBasement,
        double area,
        double height,
        int projectId,
        MultipartFile file
) {}


