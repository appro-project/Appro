package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FloorMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "planningImage", ignore = true)
    Floor toFloor(FloorDto floorDto);

}
