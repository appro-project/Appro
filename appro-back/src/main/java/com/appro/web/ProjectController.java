package com.appro.web;

import com.appro.dto.ProjectDto;
import com.appro.service.ProjectService;
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

    @GetMapping("{id}")
    public ProjectDto findProjectById(@PathVariable int id) {
        return projectService.findById(id);
    }

    @PostMapping
    public ProjectDto createProject(@RequestBody ProjectDto projectDto) {
        return projectService.create(projectDto);
    }

    @PutMapping("{id}")
    public ProjectDto updateProject(@PathVariable int id, @RequestBody ProjectDto projectDto) {
        return projectService.update(id, projectDto);
    }

}
