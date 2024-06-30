package com.appro.mapper;

import com.appro.dto.ImageInfo;
import com.appro.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {


    Image toImage(ImageInfo imageInfo);

    ImageInfo toImageInfo(Image image);

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
