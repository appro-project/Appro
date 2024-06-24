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

    Image toImage(ImageInfo imageInfo);

    ImageDto toDto(Image image);

    ImageInfo toImageInfo(Image image);

    List<ImageDto> toDtoList(List<Image> images);

    @Named("imageToFloorUrl")
    static String imageToFloorUrl(Image image) {
        return image != null ? image.getPath() : "";
    }

    @Named("toImageInfoList")
    default List<ImageInfo> toImageInfoList(List<Image> images) {
        return images.stream()
                .map(this::toImageInfo)
                .toList();
    }

    @Named("toImageInfoListFilterByTypeImage")
    default List<ImageInfo> toImageInfoListFilterByTypeImage(List<Image> images) {
        return images.stream()
                .filter(image -> "image".equals(image.getType()))
                .map(this::toImageInfo)
                .toList();
    }

    @Named("toImageInfoListFilterByTypePhoto")
    default List<ImageInfo> toImageInfoListFilterByTypePhoto(List<Image> images) {
        return images.stream()
                .filter(image -> "photo".equals(image.getType()))
                .map(this::toImageInfo)
                .toList();
    }
}
