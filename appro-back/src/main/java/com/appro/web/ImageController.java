package com.appro.web;

import com.appro.dto.ImageDto;
import com.appro.service.ImageService;
import com.appro.web.handler.TooManyItemsException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
public class ImageController {

    @Value("${images.size.filter}")
    private int imagesSizeFilter;

    private final ImageService imageService;

    @Operation(summary = "Upload project main image")
    @PostMapping("/{projectId}/mainImage") //
    public ImageDto uploadFile(@PathVariable int projectId, @RequestBody MultipartFile file) {
        return imageService.saveMainImage(projectId, file);
    }

    @Operation(summary = "Upload list of photos")
    @PostMapping("/{projectid}/photos")
    public List<ImageDto> uploadPhotos(@PathVariable int projectid,
                                       @RequestParam("projectPhotos") List<MultipartFile> files) {
        validateImagesSize(files.size());
        return imageService.savePhotos(projectid, files);
    }

    @Operation(summary = "Upload list of images")
    @PostMapping("/{projectid}/images")
    public List<ImageDto> uploadImages(@PathVariable int projectid,
                                       @RequestParam("projectPhotos") List<MultipartFile> files) {
        validateImagesSize(files.size());
        return imageService.saveImages(projectid, files);
    }

    @Operation(summary = "Upload floor image")
    @PostMapping("/{projectId}/floor/{floorId}/image")
    public ImageDto addFloorImage(@PathVariable int projectId,
                                  @PathVariable int floorId,
                                  @RequestParam("floorPlan") MultipartFile file) {
        return imageService.saveFloorImage(projectId, floorId, file);
    }

    private void validateImagesSize(int size) {
        if (size > imagesSizeFilter) {
            throw new TooManyItemsException(size);
        }
    }
}
