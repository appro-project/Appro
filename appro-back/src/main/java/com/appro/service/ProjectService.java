package com.appro.service;

import com.appro.dto.ProjectDto;
import com.appro.exception.ProjectNotFoundException;

import java.util.List;

/**
 * Service interface for managing projects.
 */
public interface ProjectService {

    /**
     * Retrieves all projects.
     *
     * @return a list of ProjectDto representing all projects.
     */
    List<ProjectDto> findAll(String sortBy, String sortDirection);

    /**
     * Retrieves a project by its ID.
     *
     * @param id the ID of the project to retrieve.
     * @return a ProjectDto representing the project with the specified ID.
     * @throws ProjectNotFoundException if no project with the specified ID is found.
     */
    ProjectDto findById(int id);

    /**
     * Creates a new project.
     *
     * @param projectDto the data transfer object containing the details of the project to create.
     * @return a ProjectDto representing the newly created project.
     //* @throws InvalidProjectDataException if the provided project data is invalid.
     */
    ProjectDto create(ProjectDto projectDto);

    /**
     * Updates an existing project.
     *
     * @param id the ID of the project to update.
     * @param projectDto the data transfer object containing the updated details of the project.
     * @return a ProjectDto representing the updated project.
     * @throws ProjectNotFoundException if no project with the specified ID is found.
     //* @throws InvalidProjectDataException if the provided project data is invalid.
     */
    ProjectDto update(int id, ProjectDto projectDto);
}
