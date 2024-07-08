package com.appro.service.impl;

import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import com.appro.exception.ImageNotFoundException;
import com.appro.mapper.ImageMapper;
import com.appro.repository.ImageRepository;
import com.appro.service.ImageService;
import com.appro.service.S3BucketService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Override
    @Transactional(readOnly = true)
    public Image findById(int id) {
        return imageRepository.findById(id).orElseThrow(() -> new ImageNotFoundException(id));
    }

    @Override
    @Transactional
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
    public Image getImageFromDtoOrExisting(ImageInfo imageInfo) {
        return imageRepository.findById(imageInfo.getId())
                .map(existingImage -> {
                    existingImage.setPath(imageInfo.getPath());
                    existingImage.setType(imageInfo.getType());
                    return existingImage;
                })
                .orElseGet(() -> imageMapper.toImage(imageInfo));
//        return imageRepository.findById(imageInfo.getId())
//                .map(existingImage -> {
//                    existingImage.setPath(imageInfo.getPath());
//                    existingImage.setType(imageInfo.getType());
//                    return existingImage;
//                })
//                .orElseGet(() -> {
//                    return imageMapper.toImage(imageInfo);
//                });
    }

    @Override
    public void removeImages(List<ImageInfo> imageInfos) {
        List<Image> imageList = imageInfos.stream().map(imageMapper::toImage).toList();
        log.info("Starting to delete images from S3 storage.");
        imageList.forEach(s3Service::delete);
        log.info("Images successfully deleted from S3. Proceeding to delete images from database.");
        imageRepository.deleteAll(imageList);
    }
}
