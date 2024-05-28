package com.appro.web;

import com.appro.dto.ImageDto;
import com.appro.dto.ProjectConfigDto;
import com.appro.dto.ProjectDto;
import com.appro.repository.projection.ProjectProjection;
import com.appro.service.ProjectService;
import com.appro.web.handler.TooManyItemsException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/project")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public List<ProjectDto> findProjects(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false, defaultValue = "ASC") String sortDirection) {
        return projectService.findAll(sortBy, sortDirection);
    }

    @GetMapping("/{id}")
    public ProjectProjection findProjectById(@PathVariable int id) {
        return projectService.findProjectById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable int id) {
        projectService.delete(id);
    }

    @PostMapping
    public ProjectDto createProject(@RequestBody ProjectDto projectDto) {
        return projectService.create(projectDto);
    }

    @PutMapping("/{id}")
    public ProjectDto updateProject(@PathVariable int id, @RequestBody ProjectDto projectDto) {
        return projectService.updateProject(id, projectDto);
    }

    @PostMapping("/{id}/mainImage")
    public ProjectDto addMainImage(@PathVariable int id, @RequestBody ImageDto imageDto) {
        return projectService.addMainImage(id, imageDto);
    }

    @PostMapping("/{id}/images")
    public ProjectDto addImagesList(@PathVariable int id, @RequestBody List<ImageDto> imageDtos) {
        validateItemsCount(imageDtos.size());
        return projectService.addImagesToProject(id, imageDtos);
    }

    @PatchMapping("/{id}")
    public ProjectDto updateProjectConfig(@PathVariable int id, @RequestBody ProjectConfigDto projectConfig) {
        return projectService.updateConfig(id, projectConfig);
    }

    private void validateItemsCount(int count) {
        if (count > 20) throw new TooManyItemsException();
    }

}
