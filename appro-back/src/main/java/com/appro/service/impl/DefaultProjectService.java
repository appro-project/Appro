package com.appro.service.impl;

import com.appro.dto.FloorDto;
import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.mapper.ImageMapper;
import com.appro.mapper.ProjectMapper;
import com.appro.repository.ProjectRepository;
import com.appro.service.ImageService;
import com.appro.service.ProjectService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DefaultProjectService implements ProjectService {

    private static final List<String> SORTABLE_FIELDS = List.of("id", "popularity", "generalArea", "projectPrice");

    private static final String CREATED_AT = "createdAt";

    private final ImageService imageService;

    private final ProjectMapper projectMapper;
    private final FloorMapper floorMapper;
    private final ImageMapper imageMapper;

    private final ProjectRepository projectRepository;


    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> findAll(String sortBy, String sortDirection) {
        Direction direction = Direction.fromString(sortDirection);

        if (isSortableField(sortBy)) {
            return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(direction, sortBy)));
        }
        return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(direction, CREATED_AT)));
    }

    @Override
    @Transactional
    public ProjectDto create(ProjectDto projectDto) {
        Project project = projectRepository.save(new Project());

        Project savedProject = applyChangesAndSave(projectDto, project);

        log.info("Created project with id: {}", savedProject.getId());
        return projectMapper.toProjectDto(savedProject);
    }

    @Override
    @Transactional
    public ProjectDto updateProject(int id, ProjectDto projectDto) {
        Project project = findProjectById(id);
        List<Image> imagesToDelete = getImagesForDeleteFromS3(projectDto, project);

        project = applyChangesAndSave(projectDto, project);
        imageService.removeImages(imagesToDelete);
        log.info("Updated project with id: {}", id);

        return projectMapper.toProjectDto(project);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Project project = findProjectById(id);

        project.setIsDeleted(true);
        log.info("Deleted project with id: {}", id);
        projectRepository.save(project);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDto findProjectFullInfo(int id) {
        Project project = findProjectById(id);
        return projectMapper.toProjectDto(project);
    }

    private Project applyChangesAndSave(ProjectDto projectDto, Project project) {
        Image mainImage = getMainImage(projectDto);
        List<Image> allItems = getAllItems(projectDto);
        List<Floor> floors = getFloors(projectDto);
        projectMapper.update(project, projectDto, mainImage, allItems, floors);

        return projectRepository.save(project);
    }

    private List<Image> getImagesForDeleteFromS3(ProjectDto projectDto, Project project) {
        List<Image> currentImages = getAllImagesFromProject(project);
        List<Image> newImages = getAllImagesFromProjectDto(projectDto);
        return currentImages.stream()
                .filter(image -> newImages.stream().noneMatch(newImage -> newImage.equals(image))).toList();
    }

    private List<Image> getAllImagesFromProject(Project project) {
        List<Image> allImages = new ArrayList<>(project.getImages());

        for (Floor floor : project.getFloors()) {
            if (Objects.nonNull(floor.getPlanningImage())) {
                allImages.add(floor.getPlanningImage());
            }
        }

        return allImages;
    }

    private List<Image> getAllImagesFromProjectDto(ProjectDto project) {
        List<ImageInfo> allImages = new ArrayList<>();

        if (Objects.nonNull(project.getImages())) {
            allImages.addAll(project.getImages());
        }

        if (Objects.nonNull(project.getPhotos())) {
            allImages.addAll(project.getPhotos());
        }

        if (Objects.nonNull(project.getMainImage())) {
            allImages.add(project.getMainImage());
        }

        if (Objects.nonNull(project.getFloors())) {
            for (FloorDto floor : project.getFloors()) {
                if (Objects.nonNull(floor.getPlanningImage())) {
                    allImages.add(floor.getPlanningImage());
                }
            }
        }

        return imageMapper.toImageList(allImages);
    }

    private List<Floor> getFloors(ProjectDto projectDto) {
        List<FloorDto> floorDtoList = Objects.isNull(projectDto.getFloors()) ?
                new ArrayList<>() :
                projectDto.getFloors();
        return floorMapper.toFloorList(floorDtoList);
    }

    Image getMainImage(ProjectDto projectDto) {
        return Objects.isNull(projectDto.getMainImage()) ?
                null :
                imageService.getImageFromDtoOrExisting(projectDto.getMainImage());
    }

    private List<Image> getAllItems(ProjectDto projectDto) {
        List<Image> images = new ArrayList<>();
        if (Objects.nonNull(projectDto.getImages())) {
            images = projectDto.getImages().stream()
                    .map(imageService::getImageFromDtoOrExisting)
                    .toList();
        }

        List<Image> photos = new ArrayList<>();
        if (Objects.nonNull(projectDto.getPhotos())) {
            photos = projectDto.getPhotos().stream()
                    .map(imageService::getImageFromDtoOrExisting)
                    .toList();
        }

        List<Image> allItems = new ArrayList<>();
        allItems.addAll(images);
        allItems.addAll(photos);
        return allItems;
    }

    Project findProjectById(int id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        return optionalProject.orElseThrow(() -> new ProjectNotFoundException(id));
    }

    boolean isSortableField(String sortBy) {
        return Objects.nonNull(sortBy) && SORTABLE_FIELDS.contains(sortBy);
    }
}


//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class DefaultProjectService implements ProjectService {
//
//    private static final List<String> SORTABLE_FIELDS = List.of("id", "popularity", "generalArea", "projectPrice");
//
//    private static final String CREATED_AT = "createdAt";
//
//    private final ImageService imageService;
//
//    private final ProjectMapper projectMapper;
//    private final FloorMapper floorMapper;
//    private final ImageMapper imageMapper;
//
//    private final ProjectRepository projectRepository;
//
//    @Override
//    @Transactional(readOnly = true)
//    public List<ProjectDto> findAll(String sortBy, String sortDirection) {
//        Direction direction = Direction.fromString(sortDirection);
//
//        if (isSortableField(sortBy)) {
//            return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(direction, sortBy)));
//        }
//        return projectMapper.toProjectsDto(projectRepository.findAll(Sort.by(direction, CREATED_AT)));
//    }
//
//    @Override
//    @Transactional
//    public ProjectDto create(ProjectDto projectDto) {
//        Project project = projectRepository.save(new Project());
//
//        Project savedProject = applyChangesAndSave(projectDto, project);
//
//        log.info("Created project with id: {}", savedProject.getId());
//        return projectMapper.toProjectDto(savedProject);
//
//    }
//
//    @Override
//    @Transactional
//    public ProjectDto updateProject(int id, ProjectDto projectDto) {
//        Project project = findProjectById(id);
//        List<Image> imagesToDelete = getImagesForDeleteFromS3(projectDto, project);
//
//            project = applyChangesAndSave(projectDto, project);
//            imageService.removeImages(imageMapper.toImageInfoList(imagesToDelete));
//            log.info("Updated project with id: {}", id);
//
//        return projectMapper.toProjectDto(project);
//    }
//
//    @Override
//    @Transactional
//    public void delete(int id) {
//        Project project = findProjectById(id);
//
//        project.setIsDeleted(true);
//        log.info("Deleted project with id: {}", id);
//        projectRepository.save(project);
//    }
//
//    @Override
//    @Transactional(readOnly = true)
//    public ProjectDto findProjectFullInfo(int id) {
//        Project project = findProjectById(id);
//        return projectMapper.toProjectDto(project);
//    }
//
//    private Project applyChangesAndSave(ProjectDto projectDto, Project project) {
//        Image mainImage = getMainImage(projectDto);
//        List<Image> allItems = getAllItems(projectDto);
//        List<Floor> floors = getFloors(projectDto);
//        projectMapper.update(project, projectDto, mainImage, allItems, floors);
//
//        return projectRepository.save(project);
//    }
//
//    private List<Image> getImagesForDeleteFromS3(ProjectDto projectDto, Project project) {
//        List<Image> currentImages = getAllImagesFromProject(project);
//        List<Image> newImages = getAllImagesFromProjectDto(projectDto);
//        return currentImages.stream()
//                .filter(image -> newImages.stream().noneMatch(newImage -> newImage.equals(image))).toList();
//    }
//
//    private List<Image> getAllImagesFromProject(Project project) {
//        List<Image> allImages = new ArrayList<>(project.getImages());
//
//        for (Floor floor : project.getFloors()) {
//            if (Objects.nonNull(floor.getPlanningImage())) {
//                allImages.add(floor.getPlanningImage());
//            }
//        }
//
//        return allImages;
//    }
//
//    private List<Image> getAllImagesFromProjectDto(ProjectDto project) {
//        List<ImageInfo> allImages = new ArrayList<>();
//
//        if (Objects.nonNull(project.getImages())) {
//            allImages.addAll(project.getImages());
//        }
//
//        if (Objects.nonNull(project.getPhotos())) {
//            allImages.addAll(project.getPhotos());
//        }
//
//        if (Objects.nonNull(project.getMainImage())) {
//            allImages.add(project.getMainImage());
//        }
//
//        if (Objects.nonNull(project.getFloors())) {
//            for (FloorDto floor : project.getFloors()) {
//                if (Objects.nonNull(floor.getPlanningImage())) {
//                    allImages.add(floor.getPlanningImage());
//                }
//            }
//        }
//
//        return imageMapper.toImageList(allImages);
//    }
//
//    private List<Floor> getFloors(ProjectDto projectDto) {
//        List<FloorDto> floorDtoList = Objects.isNull(projectDto.getFloors()) ?
//                new ArrayList<>() :
//                projectDto.getFloors();
//        return floorMapper.toFloorList(floorDtoList);
//    }
//
//    Image getMainImage(ProjectDto projectDto) {
//        return Objects.isNull(projectDto.getMainImage()) ?
//                null :
//                imageService.getImageFromDtoOrExisting(projectDto.getMainImage());
//    }
//
//    private List<Image> getAllItems(ProjectDto projectDto) {
//        List<Image> images = new ArrayList<>();
//        if (Objects.nonNull(projectDto.getImages())) {
//            images = projectDto.getImages().stream()
//                    .map(imageService::getImageFromDtoOrExisting)
//                    .toList();
//        }
//
//        List<Image> photos = new ArrayList<>();
//        if (Objects.nonNull(projectDto.getPhotos())) {
//            photos = projectDto.getPhotos().stream()
//                    .map(imageService::getImageFromDtoOrExisting)
//                    .toList();
//        }
//
//        List<Image> allItems = new ArrayList<>();
//        allItems.addAll(images);
//        allItems.addAll(photos);
//        return allItems;
//    }
//
//    Project findProjectById(int id) {
//        Optional<Project> optionalProject = projectRepository.findById(id);
//        return optionalProject.orElseThrow(() -> new ProjectNotFoundException(id));
//    }
//
//    boolean isSortableField(String sortBy) {
//        return Objects.nonNull(sortBy) && SORTABLE_FIELDS.contains(sortBy);
//    }
//}
