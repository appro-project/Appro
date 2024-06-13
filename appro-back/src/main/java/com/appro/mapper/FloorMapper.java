package com.appro.mapper;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = ImageMapper.class)
public interface FloorMapper {

    @Mapping(target = "planningImage", source = "planningImage", qualifiedByName = "imageToFloorUrl")
    FloorDto toFloorDto(Floor floor);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "planningImage", ignore = true)
    Floor toFloor(FloorDto floorDto);



    List<FloorDto> toFloorsDto(List<Floor> floors);

    @Mapping(target = "id", ignore = true)
    Floor update(@MappingTarget Floor floorToUpdate, FloorDto floorDto);
}
