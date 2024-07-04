package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.dto.ImageInfo;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FloorMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "planningImage", qualifiedByName = "mapImage")
    Floor toFloor(FloorDto floorDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "planningImage", qualifiedByName = "mapImage")
    List<Floor> toFloorList(List<FloorDto> floorDto);

    @Named("mapImage")
    default Image mapImage(ImageInfo imageInfo) {
        if (imageInfo == null) {
            return null;
        }
        Image image = new Image();
        image.setId(imageInfo.getId());
        image.setPath(imageInfo.getPath());
        image.setType(imageInfo.getType());
        return image;
    }

}
