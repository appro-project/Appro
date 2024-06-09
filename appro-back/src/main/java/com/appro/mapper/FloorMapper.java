package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FloorMapper {

    FloorDto toFloorDto(Floor floor);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    Floor toFloor(FloorDto floorDto);

    List<FloorDto> toFloorsDto(List<Floor> floors);

    @Mapping(target = "id", ignore = true)
    Floor update(@MappingTarget Floor floorToUpdate, FloorDto floorDto);
}
