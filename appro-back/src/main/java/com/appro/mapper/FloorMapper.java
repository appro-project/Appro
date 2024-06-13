package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FloorMapper {

    @Mapping(target = "planningImage", ignore = true)
    FloorDto toFloorDto(Floor floor, @Context String url);

    @AfterMapping
    default void setPlanningImageUrl(@MappingTarget FloorDto floorDto, @Context String url) {
        floorDto.setPlanningImage(url);
    }


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "planningImage", ignore = true)
    Floor toFloor(FloorDto floorDto);



    List<FloorDto> toFloorsDto(List<Floor> floors);

    @Mapping(target = "id", ignore = true)
    Floor update(@MappingTarget Floor floorToUpdate, FloorDto floorDto);
}
