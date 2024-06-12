package com.appro.service;

import com.appro.dto.ProjectConfigDto;
import com.appro.dto.ProjectDto;
import com.appro.dto.ProjectDtoFullInfo;
import com.appro.entity.Project;

import java.util.List;

/**
 * Service interface for managing projects.
 */
public interface ProjectService {

    /**
     * Retrieves all projects, optionally sorted by a specified field and direction.
     *
     * @param sortBy The field by which the results should be sorted.
     * @param sortDirection The direction of sorting (asc for ascending, desc for descending).
     * @return A list of ProjectDto objects representing the projects.
     */
    List<ProjectDto> findAll(String sortBy, String sortDirection);

//    /**
//     * Retrieves the project with the specified ID, returning a projection of the project.
//     *
//     * @param projectId The ID of the project to be retrieved.
//     * @return A ProjectDtoFullInfo object representing the project.
//     */
//    //ProjectDtoFullInfo findProjectById(Integer projectId);

    /**
     * Creates a new project based on the provided data transfer object.
     *
     * @param projectDto The data transfer object containing the details of the project to be created.
     * @return A ProjectDto object representing the created project.
     */
    ProjectDto create(ProjectDto projectDto);

    /**
     * Updates an existing project with the specified ID based on the provided data transfer object.
     *
     * @param id The ID of the project to be updated.
     * @param projectDto The data transfer object containing the updated details of the project.
     * @return A ProjectDto object representing the updated project.
     */
    ProjectDto updateProject(int id, ProjectDto projectDto);

    /**
     * Marks the project with the specified ID as deleted.
     *
     * @param id The ID of the project to be marked as deleted.
     */
    void delete(int id);

    /**
     * Updates the configuration of the project with the specified ID based on the provided configuration data transfer object.
     *
     * @param id The ID of the project whose configuration will be updated.
     * @param projectConfig The data transfer object containing the updated configuration details of the project.
     * @return A ProjectDto object representing the project with the updated configuration.
     */
    ProjectDto updateConfig(int id, ProjectConfigDto projectConfig);

    Project findProjectById(int id);

    ProjectDtoFullInfo findProjectFullInfo(int id);
}
