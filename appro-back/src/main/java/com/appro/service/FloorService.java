package com.appro.service;

import com.appro.dto.FloorDto;

public interface FloorService {
    FloorDto addFloor(FloorDto floorDto);

    FloorDto updateFloor(int id, FloorDto floorDto);
}
