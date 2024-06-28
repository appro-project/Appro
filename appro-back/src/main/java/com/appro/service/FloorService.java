package com.appro.service;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


public interface FloorService {
    FloorDto addFloor(FloorDto floorDto, MultipartFile floorPlaningImage);

    FloorDto updateFloor(int id, FloorDto floorDto, MultipartFile file);

    Floor findFloorWithProject(int projectId, int floorId);

    Floor findByIdAndProjectId(int floorId, int projectId);

    Floor save(Floor floor);
}
