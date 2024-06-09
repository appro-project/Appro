package com.appro.service;

import com.appro.dto.FloorDto;

import java.util.List;

public interface FloorService {
    FloorDto addFloor(FloorDto floorDto);

    FloorDto updateFloor(int id, FloorDto floorDto);

    List<FloorDto> findFloorsByProjectId(int projectId);
}
