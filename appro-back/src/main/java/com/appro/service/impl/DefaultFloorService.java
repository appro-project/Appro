package com.appro.service.impl;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import com.appro.entity.Project;
import com.appro.exception.FloorNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.repository.FloorRepository;
import com.appro.repository.ProjectRepository;
import com.appro.service.FloorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DefaultFloorService implements FloorService {

    private final ProjectRepository projectRepository;

    private final FloorMapper floorMapper;
    private final FloorRepository floorRepository;

    @Override
    @Transactional
    public FloorDto addFloor(FloorDto floorDto) {
        Optional<Project> optionalProject = projectRepository.findById(floorDto.getProjectId());
        if (optionalProject.isEmpty()) {
            throw new FloorNotFoundException(floorDto.getProjectId());
        }

        Project project = optionalProject.get();

        Floor floor = floorMapper.toFloor(floorDto);
        floor.setProject(project);
        return applyFloorChanges(floor);
    }

    @Override
    @Transactional
    public FloorDto updateFloor(int id, FloorDto floorDto) {
        Floor floorToUpdate = floorRepository.findById(id).orElseThrow(() -> new FloorNotFoundException(id));

        Floor updatedFloor = floorMapper.update(floorToUpdate, floorDto);

        return applyFloorChanges(updatedFloor);
    }

    @Override
    @Transactional(readOnly = true)
    public Floor findFloorWithProject(int projectId, int floorId) {
        return floorRepository.findFloor(projectId, floorId);
    }

    @Override
    @Transactional
    public Floor save(Floor floor) {
        return floorRepository.save(floor);
    }

    private FloorDto applyFloorChanges(Floor floor) {
        return floorMapper.toFloorDto(floorRepository.save(floor));
    }
}
