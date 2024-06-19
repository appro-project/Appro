package com.appro.mapper;

import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.entity.ProjectConfig;
import com.appro.entity.project_options.*;
import com.appro.web.request.AddProjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomProjectMapper {

    public Project toProject(AddProjectRequest addProjectRequest) {
        if (addProjectRequest == null) {
            return null;
        }

        return Project.builder()
                .title(addProjectRequest.getTitle())
                .description(addProjectRequest.getDescription())
                .popularity(addProjectRequest.getPopularity())
                .generalArea(addProjectRequest.getGeneralArea())
                .timeToCreate(addProjectRequest.getTimeToCreate())
                .projectPrice(addProjectRequest.getProjectPrice())
                .livingArea(addProjectRequest.getLivingArea())
                .buildingArea(addProjectRequest.getBuildingArea())
                .wallMaterial(WallMaterialOptions.fromValue(addProjectRequest.getWallMaterial()))
                .wallThickness(addProjectRequest.getWallThickness())
                .foundation(FoundationOptions.fromValue(addProjectRequest.getFoundation()))
                .ceiling(CeilingOptions.fromValue(addProjectRequest.getCeiling()))
                .roof(RoofOptions.fromValue(addProjectRequest.getRoof()))
                .buildingPrice(addProjectRequest.getBuildingPrice())
                .insulation(InsulationOptions.fromValue(addProjectRequest.getInsulation()))
                .insulationThickness(addProjectRequest.getInsulationThickness())
                .length(addProjectRequest.getLength())
                .width(addProjectRequest.getWidth())
                .style(StyleOptions.fromValue(addProjectRequest.getStyle()))
                .isGaragePresent(addProjectRequest.getIsGaragePresent())
                .bedroomCount(addProjectRequest.getBedroomCount())
                //.projectConfig(getProjectConfig(addProjectRequest))
                .images(getImages(addProjectRequest))
                .build();
    }

    public ProjectDto toProjectDto(Project project, Image mainImage, List<ImageInfo> imagesInfoList) {
        if (project == null) {
            return null;
        }

        return ProjectDto.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .popularity(project.getPopularity())
                .generalArea(project.getGeneralArea())
                .timeToCreate(project.getTimeToCreate())
                .projectPrice(project.getProjectPrice())
                .livingArea(project.getLivingArea())
                .buildingArea(project.getBuildingArea())
                .wallMaterial(project.getWallMaterial().toValue())
                .wallThickness(project.getWallThickness())
                .foundation(project.getFoundation().toValue())
                .ceiling(project.getCeiling().toValue())
                .roof(project.getRoof().toValue())
                .buildingPrice(project.getBuildingPrice())
                .insulation(project.getInsulation().toValue())
                .insulationThickness(project.getInsulationThickness())
                .length(project.getLength())
                .width(project.getWidth())
                .style(project.getStyle().toValue())
                .isGaragePresent(project.getIsGaragePresent())
                .bedroomCount(project.getBedroomCount())
                .mainImage(toImageInfo(mainImage))
                .images(imagesInfoList)
                .build();
    }

    private ProjectConfig getProjectConfig(AddProjectRequest projectRequest) {
        return ProjectConfig.builder()
                .isFinished(projectRequest.getProjectConfig().getIsFinished())
                .showOnMain(projectRequest.getProjectConfig().getShowOnMain())
                .build();
    }

    private List<Image> getImages(AddProjectRequest projectRequest) {
        List<Image> images = new ArrayList<>();
        List<Image> photos = new ArrayList<>();
        if (projectRequest.getImages() != null) {
            images = projectRequest.getImages().stream().map(this::toImage).toList();
        }
        if (projectRequest.getPhotos() != null) {
            photos = projectRequest.getPhotos().stream().map(this::toImage).toList();
        }

        Image main = toImage(projectRequest.getMainImage());

        List<Image> result = new ArrayList<>();
        result.add(main);
        result.addAll(images);
        result.addAll(photos);
        return result;
    }

    private Image toImage(ImageInfo imageInfo) {
        return Image.builder()
                .path(imageInfo.getPath())
                .type(imageInfo.getType())
                .build();
    }

    private ImageInfo toImageInfo(Image image) {
        if (image == null) {
            return null;
        }

        return ImageInfo.builder()
                .id(image.getId())
                .path(image.getPath())
                .type(image.getType())
                .build();
    }
}
