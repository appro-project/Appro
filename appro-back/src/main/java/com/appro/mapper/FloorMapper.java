package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FloorMapper {

    FloorDto toFloorDto(Floor floor);
    Floor toFloor(FloorDto floorDto);

    // @Mapping(target = "id", ignore = true)
    Floor update(@MappingTarget Floor floorToUpdate, FloorDto floorDto);
}
