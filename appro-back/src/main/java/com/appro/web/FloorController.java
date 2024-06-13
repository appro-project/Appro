package com.appro.web;

import com.appro.dto.FloorDto;
import com.appro.service.FloorService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/floor")
@RequiredArgsConstructor
public class FloorController {

    private final FloorService floorService;

    @Operation(summary = "Add new floor")
    @PostMapping // todo: maybe we should pass on project id as path variable?
    public FloorDto addFloor(@RequestBody FloorDto floorDto, @RequestBody MultipartFile file) {
        return floorService.addFloor(floorDto, file);
    }

    @Operation(summary = "Update floor")
    @PutMapping("/{id}")
    public FloorDto updateFloor(@PathVariable int id, @RequestBody FloorDto floorDto) {
        return floorService.updateFloor(id, floorDto);
    }
}
