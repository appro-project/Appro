package com.appro.mapper;

import com.appro.dto.ImageDto;
import com.appro.entity.ProjectImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    ProjectImage toImage(ImageDto imageDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    List<ProjectImage> toImagesList(List<ImageDto> imageDto);
}
