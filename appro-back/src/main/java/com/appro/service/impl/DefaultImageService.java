package com.appro.service.impl;

import com.appro.dto.ImageDto;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.mapper.ImageMapper;
import com.appro.repository.ImageRepository;
import com.appro.service.FloorService;
import com.appro.service.ImageService;
import com.appro.service.ProjectService;
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

    private final ProjectService projectService;
    private final FloorService floorService;

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Override
    @Transactional
    public ImageDto saveMainImage(int projectId, MultipartFile file) {
        Project project = projectService.findProjectById(projectId);

        String url = s3Service.upload(file);
        Image image = createMainImage(url, project);

        return imageMapper.toDto(imageRepository.save(image));
    }

    @Transactional
    public List<ImageDto> savePhotos(int projectId, List<MultipartFile> files) {
        Project project = projectService.findProjectById(projectId);

        List<Image> images = new ArrayList<>();

        files.forEach(file -> {
            String url = s3Service.upload(file);
            Image image = createPhoto(url, project);
            images.add(image);
        });

        return imageMapper.toDtoList(imageRepository.saveAll(images));
    }

    @Transactional
    public List<ImageDto> saveImages(int projectId, List<MultipartFile> files) {
        Project project = projectService.findProjectById(projectId);

        List<Image> photos = new ArrayList<>();

        files.forEach(file -> {
            String url = s3Service.upload(file);
            Image image = createImage(url, project);
            photos.add(image);
        });

        return imageMapper.toDtoList(imageRepository.saveAll(photos));
    }

    @Override
    public ImageDto saveFloorImage(int projectId, int floorId, MultipartFile file) {
        Floor floor = floorService.findFloorWithProject(projectId, floorId);

        String url = s3Service.upload(file);

        Image image = createImage(url, floor.getProject());

        floor.setPlanningImage(url);
        floorService.save(floor);

        return imageMapper.toDto(imageRepository.save(image));
    }

    private Image createImage(String imageName, Project project) {
        return Image.builder()
                .path(imageName)
                .isMain(false)
                .isPhoto(false)
                .project(project)
                .build();
    }

    private Image createMainImage(String imageName, Project project) {
        return Image.builder()
                .path(imageName)
                .isMain(true)
                .isPhoto(false)
                .project(project)
                .build();
    }

    private Image createPhoto(String imageName, Project project) {
        return Image.builder()
                .path(imageName)
                .isMain(false)
                .isPhoto(true)
                .project(project)
                .build();
    }
}
