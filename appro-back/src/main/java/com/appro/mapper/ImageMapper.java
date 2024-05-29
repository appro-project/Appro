package com.appro.mapper;

import com.appro.dto.ImageDto;
import com.appro.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    Image toImage(ImageDto imageDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    List<Image> toImagesList(List<ImageDto> imageDto);
}
