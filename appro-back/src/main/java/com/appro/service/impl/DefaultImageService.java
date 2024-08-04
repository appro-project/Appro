package com.appro.service.impl;

import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import com.appro.mapper.ImageMapper;
import com.appro.repository.ImageRepository;
import com.appro.service.ImageService;
import com.appro.service.S3BucketService;
import com.appro.service.WatermarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DefaultImageService implements ImageService {

    private final S3BucketService s3Service;
    private final WatermarkService watermarkService;

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    @Override
    @Transactional
    public List<ImageInfo> saveImages(List<MultipartFile> files, String type) {
        List<Image> images = new ArrayList<>();

        files.forEach(file -> {
            try {
                Image savedImageWithId = imageRepository.save(new Image(type));

                MultipartFile imageWithWatermark = watermarkService.addWatermark(file);
                log.info("Watermark added to: {}.", imageWithWatermark.getOriginalFilename());

                String url = s3Service.upload(imageWithWatermark, savedImageWithId);
                savedImageWithId.setPath(url);
                images.add(savedImageWithId);
                imageRepository.save(savedImageWithId);
            } catch (Exception e) {
                log.error("Failed to save image: {}", file.getOriginalFilename(), e);
            }
        });
        List<ImageInfo> savedImages = imageMapper.toImageInfoList(images);
        log.info("Successfully saved {} images.", savedImages.size());
        return savedImages;
    }

    @Override
    public Image getImageFromDtoOrExisting(ImageInfo imageInfo) {
        return imageRepository.findById(imageInfo.getId())
                .map(existingImage -> {
                    existingImage.setPath(imageInfo.getPath());
                    existingImage.setType(imageInfo.getType());
                    return existingImage;
                })
                .orElseGet(() -> imageMapper.toImage(imageInfo));
    }

    @Override
    public void removeImages(List<Image> images) {
        log.info("Starting to delete images from S3 storage.");
        images.forEach(s3Service::delete);
        log.info("Images successfully deleted from S3. Proceeding to delete images from database.");
        imageRepository.deleteAll(images);
    }
}
