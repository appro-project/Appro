package com.appro.mapper;

import com.appro.dto.ImageDto;
import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    Image toImage(ImageDto imageDto);

    ImageDto toDto(Image image);

    ImageInfo toImageInfo(Image image);

    List<ImageDto> toDtoList(List<Image> images);

    @Named("imageToFloorUrl")
    static String imageToFloorUrl(Image image) {
        return image != null ? image.getPath() : "";
    }

    List<ImageInfo> toImageInfoList(List<Image> images);
}
