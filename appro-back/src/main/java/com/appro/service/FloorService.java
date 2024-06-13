package com.appro.service;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FloorService {
    FloorDto addFloor(FloorDto floorDto, MultipartFile floorPlaningImage);

    FloorDto updateFloor(int id, FloorDto floorDto);

    Floor findFloorWithProject(int projectId, int floorId);

    Floor save(Floor floor);
}
