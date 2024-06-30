package com.appro.web;

import com.appro.dto.*;
import com.appro.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/project")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ProjectDto createProject(@RequestBody ProjectDto projectDto) {
        return projectService.create(projectDto);
    }

    @Operation(summary = "Find all projects")
    @GetMapping
    public List<ProjectDto> findProjects(
            @RequestParam(required = false, defaultValue = "id") String sortBy,
            @RequestParam(required = false, defaultValue = "ASC") String sortDirection) {
        return projectService.findAll(sortBy, sortDirection);
    }

    @Operation(summary = "Find project by id")
    @GetMapping("/{id}")
    public ProjectDto findProjectById(@PathVariable int id) {
        return projectService.findProjectFullInfo(id);
    }

    @Operation(summary = "Delete project")
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable int id) {
        projectService.delete(id);
    }

    @Operation(summary = "Update project")
    @PutMapping("/{id}")
    public ProjectDto updateProject(@PathVariable int id, @RequestBody ProjectDto projectDto) {
        projectDto.setId(id);

        return projectService.updateProject(id, projectDto);
    }

}
