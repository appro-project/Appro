package com.appro.service.impl;

import com.appro.dto.FloorDto;
import com.appro.entity.Floor;
import com.appro.entity.Project;
import com.appro.exception.FloorNotFoundException;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.repository.FloorRepository;
import com.appro.repository.ProjectRepository;
import com.appro.service.FloorService;
import com.appro.service.S3BucketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DefaultFloorService implements FloorService {

    private final S3BucketService s3BucketService;

    private final ProjectRepository projectRepository;

    private final FloorMapper floorMapper;
    private final FloorRepository floorRepository;

    @Override
    @Transactional
    public FloorDto addFloor(FloorDto floorDto, MultipartFile file) {
        Optional<Project> optionalProject = projectRepository.findById(floorDto.getProjectId());

        if (optionalProject.isEmpty()) {
            throw new ProjectNotFoundException(floorDto.getProjectId());
        }
        Project project = optionalProject.get();

        String url = s3BucketService.upload(file);

        Floor floor = floorMapper.toFloor(floorDto);
        floor.setProject(project);
        floor.setPlanningImage(url);
        // todo: should we store planning floor images in image table?
        floorRepository.save(floor);

        return floorMapper.toFloorDto(floor, url); // todo: fix it
    }

    @Override
    @Transactional
    public FloorDto updateFloor(int id, FloorDto floorDto, MultipartFile file) {
        Floor floorToUpdate = floorRepository.findById(id).orElseThrow(() -> new FloorNotFoundException(id));

        Floor updatedFloor = floorMapper.update(floorToUpdate, floorDto);
        String url = s3BucketService.upload(file);

        floorRepository.save(updatedFloor);

        return floorMapper.toFloorDto(updatedFloor, url);
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

//    private FloorDto applyFloorChanges(Floor floor) {
//        return floorMapper.toFloorDto(floorRepository.save(floor));
//    }
}
