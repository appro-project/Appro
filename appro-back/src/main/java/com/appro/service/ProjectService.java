package com.appro.service;

import com.appro.dto.ImageDto;
import com.appro.dto.ProjectConfigDto;
import com.appro.dto.ProjectDto;
import com.appro.exception.ProjectNotFoundException;
import com.appro.repository.projection.ProjectProjection;

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

    /**
     * Retrieves the project with the specified ID, returning a projection of the project.
     *
     * @param projectId The ID of the project to be retrieved.
     * @return A ProjectProjection object representing the project.
     */
    ProjectProjection findProjectById(Integer projectId);

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
     * Adds a main image to the project with the specified ID based on the provided image data transfer object.
     *
     * @param projectId The ID of the project to which the main image will be added.
     * @param imageDto The data transfer object containing the details of the main image to be added.
     * @return A ProjectDto object representing the project with the added main image.
     */
    ProjectDto addMainImage(int projectId, ImageDto imageDto);

    /**
     * Adds multiple images to the project with the specified ID based on the provided list of image data transfer objects.
     *
     * @param projectId The ID of the project to which the images will be added.
     * @param imageDtos A list of data transfer objects containing the details of the images to be added.
     * @return A ProjectDto object representing the project with the added images.
     */
    ProjectDto addImagesToProject(int projectId, List<ImageDto> imageDtos);

    /**
     * Updates the configuration of the project with the specified ID based on the provided configuration data transfer object.
     *
     * @param id The ID of the project whose configuration will be updated.
     * @param projectConfig The data transfer object containing the updated configuration details of the project.
     * @return A ProjectDto object representing the project with the updated configuration.
     */
    ProjectDto updateConfig(int id, ProjectConfigDto projectConfig);
}
