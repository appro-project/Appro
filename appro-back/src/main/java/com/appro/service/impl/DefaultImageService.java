package com.appro.service.impl;

import com.appro.dto.ImageDto;
import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import com.appro.mapper.ImageMapper;
import com.appro.repository.ImageRepository;
import com.appro.service.ImageService;
import com.appro.service.S3BucketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DefaultImageService implements ImageService {

    private final S3BucketService s3Service;

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    public void saveImagesToDb(List<Image> images) {
        imageRepository.saveAll(images);
    }

    @Transactional
    public void removeImages(List<Image> images) {
        images.forEach(s3Service::delete);
        imageRepository.deleteAll(images);
    }

    public void removeImage(String imageUrls) {
        s3Service.delete(imageRepository.deleteByPath(imageUrls));
    }


    @Override
    public Image findById(int id) {
        return imageRepository.findById(id).orElseThrow(() -> new RuntimeException("Can not find Image by id: " + id));
    }

    @Override
    public List<ImageInfo> saveImages(List<MultipartFile> files) {
        List<Image> images = new ArrayList<>();

        files.forEach(file -> {
            Image savedImageWithId = imageRepository.save(new Image());
            String url = s3Service.upload(file, savedImageWithId);
            savedImageWithId.setPath(url);
            images.add(savedImageWithId);
        });


        return imageMapper.toImageInfoList(images);
    }


    // TODO: ALARM!!!!!

    @Override
    public ImageDto saveFloorImage(int projectId, int floorId, MultipartFile file) {
//        Floor floor = floorService.findFloorWithProject(projectId, floorId);


//        Image image = createImage("url", floor.getProject());
//        String url = s3Service.upload(file, image);
//
//        floor.setPlanningImage(url);
//        floorService.save(floor);
//
//        return imageMapper.toDto(imageRepository.save(image));
        return null;
    }


}
