package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import com.appro.web.request.FloorModelRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Context;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FloorMapper {

    @Mapping(target = "planningImage", ignore = true)
    @Mapping(target = "projectId", source = "project.id")
    FloorDto toFloorDto(Floor floor, @Context String url);

    @AfterMapping
    default void setPlanningImageUrl(@MappingTarget FloorDto floorDto, @Context String url) {
        floorDto.setPlanningImage(url);
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "planningImage", ignore = true)
    FloorDto toFloorDtoFromModelRequest(FloorModelRequest floorModelRequest);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "planningImage", ignore = true)
    Floor toFloor(FloorDto floorDto);

    List<FloorDto> toFloorsDto(List<Floor> floors);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "planningImage", ignore = true)
    Floor update(@MappingTarget Floor floorToUpdate, FloorDto floorDto);
}
