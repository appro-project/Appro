package com.appro.service.impl;

import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import com.appro.exception.ImageNotFoundException;
import com.appro.mapper.ImageMapper;
import com.appro.repository.ImageRepository;
import com.appro.service.ImageService;
import com.appro.service.S3BucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DefaultImageService implements ImageService {

    private final S3BucketService s3Service;

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Override
    public Image findById(int id) {
        return imageRepository.findById(id).orElseThrow(() -> new ImageNotFoundException(id));
    }

    @Transactional
    @Override
    public List<ImageInfo> saveImages(List<MultipartFile> files, String type) {
        List<Image> images = new ArrayList<>();

        files.forEach(file -> {
            try {
                Image savedImageWithId = imageRepository.save(new Image(type));
                String url = s3Service.upload(file, savedImageWithId);
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
    public Image save(Image image) {
        return imageRepository.save(image);
    }

    @Override
    @Transactional
    public List<Image> processNewAndOldImages(List<ImageInfo> newImages, List<Image> oldImages) {
        log.info("Processing new and old images. New images count: {}, Old images count: {}", newImages.size(), oldImages.size());
        List<Image> toAdd = new ArrayList<>();
        List<ImageInfo> toRemove = new ArrayList<>();

        newImages.forEach(newImage -> {
            if (oldImages.stream().noneMatch(i -> i.getId() == newImage.getId())) {
                toAdd.add(imageMapper.toImage(newImage));
            }
        });

        oldImages.forEach(oldImage -> {
            if (newImages.stream().noneMatch(i -> i.getId() == oldImage.getId())) {
                toRemove.add(imageMapper.toImageInfo(oldImage));
            }
        });

        removeImages(toRemove);

        log.info("Removed {} old images.", toRemove.size());
        log.info("Added {} new images.", toAdd.size());
        return toAdd;
    }

    @Override
    public Image findMainImage(int projectId) {
        Optional<Image> optionalImage = imageRepository.findMainImageByProjectId(projectId);
        return optionalImage.orElse(null);
    }

    void removeImages(List<ImageInfo> imageInfos) {
        List<Image> imageList = imageInfos.stream().map(imageMapper::toImage).toList();
        log.info("Starting to delete images from S3 storage.");
        imageList.forEach(s3Service::delete);
        log.info("Images successfully deleted from S3. Proceeding to delete images from database.");
        imageRepository.deleteAll(imageList);
    }
}
