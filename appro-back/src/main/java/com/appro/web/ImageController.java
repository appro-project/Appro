package com.appro.web;

import com.appro.dto.ImageInfo;
import com.appro.exception.InvalidImageTypeException;
import com.appro.service.ImageService;
import com.appro.exception.TooManyItemsException;
import com.appro.web.request.AddImagesRequest;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageController {

    @Value("${images.size.filter}")
    private int imagesSizeFilter;

    private final ImageService imageService;

    @Operation(summary = "Upload list of images")
    @PostMapping
    public List<ImageInfo> uploadImages(@ModelAttribute AddImagesRequest imagesRequest) {
        validateImagesSize(imagesRequest.images().size());
        validateImageType(imagesRequest.type());
        return imageService.saveImages(imagesRequest.images(), imagesRequest.type());
    }

    @Operation(summary = "Delete images or photos")
    @DeleteMapping
    public void deleteImages(@RequestBody List<ImageInfo> images) {
        imageService.removeImages(images);
    }

    private void validateImagesSize(int size) {
        if (size > imagesSizeFilter) {
            throw new TooManyItemsException(size);
        }
    }

    private void validateImageType(String type) {
        if (!type.equals("image") && !type.equals("photo")) {
            throw new InvalidImageTypeException(type);
        }
    }
}