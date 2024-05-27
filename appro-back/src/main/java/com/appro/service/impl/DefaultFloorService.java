package com.appro.service.impl;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import com.appro.exception.FloorNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.repository.FloorRepository;
import com.appro.service.FloorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DefaultFloorService implements FloorService {

    private final FloorMapper floorMapper;
    private final FloorRepository floorRepository;

    @Override
    @Transactional
    public FloorDto addFloor(FloorDto floorDto) {
        Floor floor = floorMapper.toFloor(floorDto);
        return floorMapper.toFloorDto(floorRepository.save(floor));
    }

    @Override
    @Transactional
    public FloorDto updateFloor(int id, FloorDto floorDto) {
        Floor floorToUpdate = floorRepository.findById(id).orElseThrow(() -> new FloorNotFoundException(id));

        Floor updatedFloor = floorMapper.update(floorToUpdate, floorDto);

        return floorMapper.toFloorDto(floorRepository.save(updatedFloor));
    }
}
