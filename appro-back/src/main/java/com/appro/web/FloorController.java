package com.appro.web;

import com.appro.dto.FloorDto;
import com.appro.service.FloorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/floor")
@RequiredArgsConstructor
public class FloorController {

    private final FloorService floorService;

    @PostMapping
    public FloorDto addFloor(@RequestBody FloorDto floorDto) {
        return floorService.addFloor(floorDto);
    }

    @PutMapping("/{id}")
    public FloorDto updateFloor(@PathVariable int id, @RequestBody FloorDto floorDto) {
        return floorService.updateFloor(id, floorDto);
    }
}
