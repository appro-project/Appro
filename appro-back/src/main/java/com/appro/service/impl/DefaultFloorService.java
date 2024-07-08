package com.appro.service.impl;

import com.appro.entity.Floor;
import com.appro.repository.FloorRepository;
import com.appro.service.FloorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DefaultFloorService implements FloorService {

    private final FloorRepository floorRepository;

    @Override
    @Transactional
    public Floor findById(int id) {
        return floorRepository.findById(id).orElseThrow(() -> new RuntimeException("Floor not found by Id: " + id));
    }
}
