package com.appro.web;

import com.appro.dto.FloorDto;
import com.appro.mapper.FloorMapper;
import com.appro.service.FloorService;
import com.appro.web.request.FloorModelRequest;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/floor")
@RequiredArgsConstructor
public class FloorController {

    private final FloorService floorService;
    private final FloorMapper mapper;

    // todo: maybe we should pass on project id as path variable?
    @Operation(summary = "Add new floor")
    @PostMapping // +
    public FloorDto createFloor(@ModelAttribute FloorModelRequest floorModelRequest) {

        FloorDto floorDto = mapper.toFloorDtoFromModelRequest(floorModelRequest);
        return floorService.addFloor(floorDto, floorModelRequest.file());
    }

    @Operation(summary = "Update floor")
    @PutMapping("/{id}") // +
    public FloorDto updateFloor(@PathVariable int id, @ModelAttribute FloorModelRequest floorModelRequest) {
        FloorDto floorDto = mapper.toFloorDtoFromModelRequest(floorModelRequest);
        return floorService.updateFloor(id, floorDto, floorModelRequest.file());
    }
}
