package com.appro.web;

import com.appro.AbstractAmazonS3ITest;
import com.appro.dto.FloorDto;
import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.mapper.ImageMapper;
import com.appro.repository.ProjectRepository;
import com.appro.service.ImageService;
import com.appro.service.ProjectService;
import com.appro.web.handler.ErrorResponse;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.context.jdbc.Sql;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

public class ProjectControllerITest extends AbstractAmazonS3ITest {

    private static final String ID = "id";
    private static final String POPULARITY = "popularity";
    private static final String GENERAL_AREA = "generalArea";
    private static final String PROJECT_PRICE = "projectPrice";
    private static final String ASC = "ASC";
    private static final String DESC = "DESC";

    private static final int FIRST_PROJECT_ID = 1;
    private static final int SECOND_PROJECT_ID = 2;
    private static final int THIRD_PROJECT_ID = 3;
    private static final int FOURTH_PROJECT_ID = 4;

    private static final String PROJECT_URL = "/api/v1/project";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private FloorMapper floorMapper;

    @Test
    @Sql(scripts = "classpath:sql/project/insert_projects.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'id' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByIdDirectionASC() {

        List<ProjectDto> expectedProjects = projectService.findAll("id", ASC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(ID, ASC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(FIRST_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(SECOND_PROJECT_ID, actualProjects.get(1).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/insert_projects.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'id' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByIdDirectionDESC() {

        List<ProjectDto> expectedProjects = projectService.findAll(ID, DESC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(ID, DESC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'popularity' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByPopularityDirectionASC() {

        List<ProjectDto> expectedProjects = projectService.findAll(POPULARITY, ASC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(POPULARITY, ASC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(THIRD_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(FOURTH_PROJECT_ID, actualProjects.get(1).getId());
        assertEquals(FIRST_PROJECT_ID, actualProjects.get(2).getId());
        assertEquals(SECOND_PROJECT_ID, actualProjects.get(3).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'popularity' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByPopularityDirectionDESC() {

        List<ProjectDto> expectedProjects = projectService.findAll(POPULARITY, DESC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(POPULARITY, DESC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
        assertEquals(FOURTH_PROJECT_ID, actualProjects.get(2).getId());
        assertEquals(THIRD_PROJECT_ID, actualProjects.get(3).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'general area' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByGeneralAreaDirectionASC() {

        List<ProjectDto> expectedProjects = projectService.findAll(GENERAL_AREA, ASC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(GENERAL_AREA, ASC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(THIRD_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(FOURTH_PROJECT_ID, actualProjects.get(1).getId());
        assertEquals(FIRST_PROJECT_ID, actualProjects.get(2).getId());
        assertEquals(SECOND_PROJECT_ID, actualProjects.get(3).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'general area' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByGeneralAreaDirectionDESC() {

        List<ProjectDto> expectedProjects = projectService.findAll(GENERAL_AREA, DESC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(GENERAL_AREA, DESC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
        assertEquals(FOURTH_PROJECT_ID, actualProjects.get(2).getId());
        assertEquals(THIRD_PROJECT_ID, actualProjects.get(3).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'project price' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByProjectPriceDirectionASC() {

        List<ProjectDto> expectedProjects = projectService.findAll(PROJECT_PRICE, ASC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(PROJECT_PRICE, ASC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(THIRD_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(FOURTH_PROJECT_ID, actualProjects.get(1).getId());
        assertEquals(FIRST_PROJECT_ID, actualProjects.get(2).getId());
        assertEquals(SECOND_PROJECT_ID, actualProjects.get(3).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'project price' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByProjectPriceDirectionDESC() {

        List<ProjectDto> expectedProjects = projectService.findAll(PROJECT_PRICE, DESC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                createUrl(PROJECT_PRICE, DESC),
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
        assertEquals(FOURTH_PROJECT_ID, actualProjects.get(2).getId());
        assertEquals(THIRD_PROJECT_ID, actualProjects.get(3).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, by default values. Sort - 'creating date', direction - 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByDefault() {

        List<ProjectDto> expectedProjects = projectService.findAll(ID, ASC);

        ResponseEntity<List<ProjectDto>> response = restTemplate.exchange(
                PROJECT_URL,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        assertEquals(FIRST_PROJECT_ID, actualProjects.get(0).getId());
        assertEquals(SECOND_PROJECT_ID, actualProjects.get(1).getId());
        assertEquals(THIRD_PROJECT_ID, actualProjects.get(2).getId());
        assertEquals(FOURTH_PROJECT_ID, actualProjects.get(3).getId());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjectById_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find project by id with additional data.")
    void givenProject_whenFindById_thenReturnProjectWithAdditionalData() {
        int expectedProjectId = 1;

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL + '/' + FIRST_PROJECT_ID,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto project = response.getBody();

        ImageInfo actualMainImage = project.getMainImage();
        List<ImageInfo> actualImages = project.getImages();
        List<FloorDto> actualFloors = project.getFloors();

        assertEquals(expectedProjectId, project.getId());
        assertNotNull(actualMainImage);
        assertNotNull(actualImages);
        assertNotNull(actualFloors);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjectById_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find project by id with additional data.")
    void givenProject_whenFindById_thenThrowNotFoundException() {

        String expectedErrorMessage = "Project with id: 2 does not exist";

        ResponseEntity<ErrorResponse> response = restTemplate.exchange(
                PROJECT_URL + '/' + SECOND_PROJECT_ID,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());

        ErrorResponse errorResponse = response.getBody();
        assertEquals(expectedErrorMessage, errorResponse.message());
        assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.statusCode());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/deleteProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - delete project by id.")
    void givenProjects_whenDelete_thenRemoveProjectFromDB() {

        List<ProjectDto> beforeRemove = projectService.findAll(ID, ASC);

        assertEquals(2, beforeRemove.size());

        ResponseEntity<Void> response = restTemplate.exchange(
                PROJECT_URL + '/' + FIRST_PROJECT_ID,
                HttpMethod.DELETE,
                null,
                Void.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNull(response.getBody());

        List<ProjectDto> afterRemove = projectService.findAll(ID, ASC);
        assertEquals(1, afterRemove.size());

        Assertions.assertThrows(ProjectNotFoundException.class, () -> projectService.findProjectFullInfo(FIRST_PROJECT_ID));
    }

    @Test
    @Sql(scripts = "classpath:sql/project/deleteProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - delete project by not existing id.")
    void givenProjects_whenDelete_thenThrowProjectNotFoundException() {

        String expectedErrorMessage = "Project with id: 3 does not exist";
        int expectedProjectsSizeBeforeDelete = 2;
        int actualProjectsSizeBeforeDelete = projectRepository.findAll().size();

        assertEquals(expectedProjectsSizeBeforeDelete, actualProjectsSizeBeforeDelete);

        ResponseEntity<ErrorResponse> response = restTemplate.exchange(
                PROJECT_URL + '/' + THIRD_PROJECT_ID,
                HttpMethod.DELETE,
                null,
                new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());

        int actualProjectsSizeAfterDelete = projectRepository.findAll().size();
        assertEquals(expectedProjectsSizeBeforeDelete, actualProjectsSizeAfterDelete);

        ErrorResponse errorResponse = response.getBody();
        assertEquals(expectedErrorMessage, errorResponse.message());
        assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.statusCode());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/updateProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - update project attributes")
    void givenProject_whenUpdate_thenModifyProjectAttributes() {
        Project projectBeforeUpdate = projectRepository.findById(FIRST_PROJECT_ID).orElse(null);

        ProjectDto updateProjectRequestBody = createProject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(updateProjectRequestBody, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL + '/' + FIRST_PROJECT_ID,
                HttpMethod.PUT,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto updatedProject = response.getBody();

        // Assert it same project
        assertEquals(projectBeforeUpdate.getId(), updatedProject.getId());

        // Assert attributes
        Assertions.assertNotEquals(projectBeforeUpdate.getTitle(), updatedProject.getTitle());
        Assertions.assertNotEquals(projectBeforeUpdate.getDescription(), updatedProject.getDescription());
        Assertions.assertNotEquals(projectBeforeUpdate.getPopularity(), updatedProject.getPopularity());
        Assertions.assertNotEquals(projectBeforeUpdate.getGeneralArea(), updatedProject.getGeneralArea());
        Assertions.assertNotEquals(projectBeforeUpdate.getTimeToCreate(), updatedProject.getTimeToCreate());
        Assertions.assertNotEquals(projectBeforeUpdate.getLivingArea(), updatedProject.getLivingArea());
        Assertions.assertNotEquals(projectBeforeUpdate.getWallMaterial().toValue(), updatedProject.getWallMaterial());
        Assertions.assertNotEquals(projectBeforeUpdate.getWallThickness(), updatedProject.getWallThickness());
        Assertions.assertNotEquals(projectBeforeUpdate.getFoundation().toValue(), updatedProject.getFoundation());
        Assertions.assertNotEquals(projectBeforeUpdate.getCeiling().toValue(), updatedProject.getCeiling());
        Assertions.assertNotEquals(projectBeforeUpdate.getRoof().toValue(), updatedProject.getRoof());
        Assertions.assertNotEquals(projectBeforeUpdate.getBuildingPrice(), updatedProject.getBuildingPrice());
        Assertions.assertNotEquals(projectBeforeUpdate.getInsulation().toValue(), updatedProject.getInsulation());
        Assertions.assertNotEquals(projectBeforeUpdate.getInsulationThickness(), updatedProject.getInsulationThickness());
        Assertions.assertNotEquals(projectBeforeUpdate.getLength(), updatedProject.getLength());
        Assertions.assertNotEquals(projectBeforeUpdate.getWidth(), updatedProject.getWidth());
        Assertions.assertNotEquals(projectBeforeUpdate.getStyle().toValue(), updatedProject.getStyle());
        Assertions.assertNotEquals(projectBeforeUpdate.getIsGaragePresent(), updatedProject.getIsGaragePresent());
        Assertions.assertNotEquals(projectBeforeUpdate.getBedroomCount(), updatedProject.getBedroomCount());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/updateProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - update project images")
    void givenProject_whenUpdate_thenModifyProjectImages() {
        Project projectBeforeUpdate = projectRepository.findById(FIRST_PROJECT_ID).orElse(null);
        assert projectBeforeUpdate != null;
        Image mainImageBeforeUpdate = projectBeforeUpdate.getImages().stream().filter(image -> image.getType().equals("main")).findFirst().orElse(null);
        List<Image> imagesBeforeUpdate = projectBeforeUpdate.getImages();

        ProjectDto updateProjectRequestBody = createProject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(updateProjectRequestBody, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL + '/' + FIRST_PROJECT_ID,
                HttpMethod.PUT,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto updatedProject = response.getBody();

        // Assert main image
        ImageInfo newMainImage = updatedProject.getMainImage();

        Assertions.assertNotEquals(mainImageBeforeUpdate.getId(), newMainImage.getId());
        Assertions.assertNotEquals(mainImageBeforeUpdate.getPath(), newMainImage.getPath());
        assertEquals(mainImageBeforeUpdate.getType(), newMainImage.getType());

        // Assert images
        int expectedImagesSize = 2;
        List<ImageInfo> actualImages = updatedProject.getImages();
        Image firstImage = imageMapper.toImage(actualImages.get(0));
        Image secondImage = imageMapper.toImage(actualImages.get(1));

        int imagesSizeAfterUpdate = actualImages.size();
        List<ImageInfo> expectedImages = createImages();

        assertEquals(expectedImagesSize, imagesSizeAfterUpdate);

        assertEquals(expectedImages.get(0).getPath(), actualImages.get(0).getPath());
        assertEquals(expectedImages.get(0).getType(), actualImages.get(0).getType());
        assertEquals(expectedImages.get(1).getPath(), actualImages.get(1).getPath());
        assertEquals(expectedImages.get(1).getType(), actualImages.get(1).getType());

        Assertions.assertFalse(imagesBeforeUpdate.contains(firstImage));
        Assertions.assertFalse(imagesBeforeUpdate.contains(secondImage));
    }

    @Test
    @Sql(scripts = "classpath:sql/project/updateProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - update project floors")
    void givenProject_whenUpdate_thenModifyProjectFloors() {
        Project projectBeforeUpdate = projectRepository.findById(FIRST_PROJECT_ID).orElse(null);
        assert projectBeforeUpdate != null;
        List<Floor> floorsBeforeUpdate = projectBeforeUpdate.getFloors();

        ProjectDto updateProjectRequestBody = createProject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(updateProjectRequestBody, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL + '/' + FIRST_PROJECT_ID,
                HttpMethod.PUT,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto updatedProject = response.getBody();

        // Assert floors
        int expectedFloorSize = 2;
        List<FloorDto> actualFloors = updatedProject.getFloors();
        FloorDto firstActualFloor = actualFloors.get(0);
        FloorDto secondActualFloor = actualFloors.get(1);
        int actualFloorSize = actualFloors.size();
        List<FloorDto> expectedFloors = createFloors();
        FloorDto firstExpectedFloor = expectedFloors.get(0);
        FloorDto secondExpectedFloor = expectedFloors.get(1);

        assertEquals(expectedFloorSize, actualFloorSize);
        // first floor
        assertEquals(firstExpectedFloor.getIndex(), firstActualFloor.getIndex());
        assertEquals(firstExpectedFloor.getArea(), firstActualFloor.getArea());
        assertEquals(firstExpectedFloor.getHeight(), firstActualFloor.getHeight());
        assertEquals(firstExpectedFloor.getIsAttic(), firstActualFloor.getIsAttic());
        assertEquals(firstExpectedFloor.getIsBasement(), firstActualFloor.getIsBasement());

        assertEquals(firstExpectedFloor.getPlanningImage().getId(), firstActualFloor.getPlanningImage().getId());
        assertEquals(firstExpectedFloor.getPlanningImage().getPath(), firstActualFloor.getPlanningImage().getPath());
        assertEquals(firstExpectedFloor.getPlanningImage().getType(), firstActualFloor.getPlanningImage().getType());
        // second floor
        assertEquals(secondExpectedFloor.getIndex(), secondActualFloor.getIndex());
        assertEquals(secondExpectedFloor.getArea(), secondActualFloor.getArea());
        assertEquals(secondExpectedFloor.getHeight(), secondActualFloor.getHeight());
        assertEquals(secondExpectedFloor.getIsAttic(), secondActualFloor.getIsAttic());
        assertEquals(secondExpectedFloor.getIsBasement(), secondActualFloor.getIsBasement());

        assertEquals(firstExpectedFloor.getPlanningImage().getId(), firstActualFloor.getPlanningImage().getId());
        assertEquals(firstExpectedFloor.getPlanningImage().getPath(), firstActualFloor.getPlanningImage().getPath());
        assertEquals(firstExpectedFloor.getPlanningImage().getType(), firstActualFloor.getPlanningImage().getType());
        Assertions.assertFalse(floorsBeforeUpdate.contains(floorMapper.toFloor(firstActualFloor)));
        Assertions.assertFalse(floorsBeforeUpdate.contains(floorMapper.toFloor(secondActualFloor)));
    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create project, check fields.")
    public void givenProjectDto_whenCreate_thenReturnNewProjectCheckFields() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();

        assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

        ProjectDto expectedProject = createProject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(expectedProject, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL,
                HttpMethod.POST,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert fields
        assertEquals(FIRST_PROJECT_ID, actualProject.getId());
        assertEquals(expectedProject.getTitle(), actualProject.getTitle());
        assertEquals(expectedProject.getDescription(), actualProject.getDescription());
        assertEquals(expectedProject.getPopularity(), actualProject.getPopularity());
        assertEquals(expectedProject.getGeneralArea(), actualProject.getGeneralArea());
        assertEquals(expectedProject.getTimeToCreate(), actualProject.getTimeToCreate());
        assertEquals(expectedProject.getProjectPrice(), actualProject.getProjectPrice());
        assertEquals(expectedProject.getLivingArea(), actualProject.getLivingArea());
        assertEquals(expectedProject.getBuildingArea(), actualProject.getBuildingArea());
        assertEquals(expectedProject.getWallThickness(), actualProject.getWallThickness());
        assertEquals(expectedProject.getBuildingPrice(), actualProject.getBuildingPrice());
        assertEquals(expectedProject.getInsulationThickness(), actualProject.getInsulationThickness());
        assertEquals(expectedProject.getLength(), actualProject.getLength());
        assertEquals(expectedProject.getWidth(), actualProject.getWidth());
        assertEquals(expectedProject.getIsGaragePresent(), actualProject.getIsGaragePresent());
        assertEquals(expectedProject.getBedroomCount(), actualProject.getBedroomCount());

        int expectedProjectsSizeAfterCreating = 1;
        int actualProjectsSizeAfterCreating = projectRepository.findAll().size();
        assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create project, check options.")
    public void givenProjectDto_whenCreate_thenReturnNewProjectCheckOptions() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();

        assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

        ProjectDto expectedProject = createProject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(expectedProject, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL,
                HttpMethod.POST,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert options
        assertEquals(expectedProject.getWallMaterial(), actualProject.getWallMaterial());
        assertEquals(expectedProject.getFoundation(), actualProject.getFoundation());
        assertEquals(expectedProject.getCeiling(), actualProject.getCeiling());
        assertEquals(expectedProject.getRoof(), actualProject.getRoof());
        assertEquals(expectedProject.getInsulation(), actualProject.getInsulation());
        assertEquals(expectedProject.getStyle(), actualProject.getStyle());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create project, check images.")
    public void givenProjectDto_whenCreate_thenReturnNewProjectCheckImages() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();

        assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

        ProjectDto expectedProject = createProject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(expectedProject, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL,
                HttpMethod.POST,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert images
        String expectedMainImageType = "main";
        String expectedImageType = "image";
        assertNotNull(actualProject.getMainImage());
        assertNotNull(actualProject.getImages());
        assertNotNull(actualProject.getFloors());

        ImageInfo expectedMainImage = expectedProject.getMainImage();
        ImageInfo actualMainImage = actualProject.getMainImage();
        assertEquals(expectedMainImage.getPath(), actualMainImage.getPath());
        assertEquals(expectedMainImageType, actualMainImage.getType());

        int expectedImageSize = 2;
        List<ImageInfo> expectedImages = expectedProject.getImages();
        List<ImageInfo> actualImages = actualProject.getImages();
        assertEquals(expectedImages.get(0).getPath(), actualImages.get(0).getPath());
        assertEquals(expectedImageType, actualImages.get(0).getType());
        assertEquals(expectedImages.get(1).getPath(), actualImages.get(1).getPath());
        assertEquals(expectedImageType, actualImages.get(1).getType());
        assertEquals(expectedImageSize, actualProject.getImages().size());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create project, check floors.")
    public void givenProjectDto_whenCreate_thenReturnNewProjectCheckFloors() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();

        assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

        ProjectDto expectedProject = createProject();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(expectedProject, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL,
                HttpMethod.POST,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert floors
        int expectedFloorSize = 2;
        assertEquals(expectedFloorSize, actualProject.getFloors().size());

        List<FloorDto> expectedFloors = expectedProject.getFloors();
        FloorDto expectedFirstFloor = expectedFloors.get(0);
        FloorDto expectedSecondFloor = expectedFloors.get(1);

        List<FloorDto> actualFloors = actualProject.getFloors();
        FloorDto actualFirstFloor = actualFloors.get(0);
        FloorDto actualSecondFloor = actualFloors.get(1);
        assertEquals(expectedFirstFloor.getIndex(), actualFirstFloor.getIndex());
        assertEquals(expectedFirstFloor.getIsBasement(), actualFirstFloor.getIsBasement());
        assertEquals(expectedFirstFloor.getIsAttic(), actualFirstFloor.getIsAttic());
        assertEquals(expectedFirstFloor.getHeight(), actualFirstFloor.getHeight());
        assertEquals(expectedFirstFloor.getPlanningImage().getId(), actualFirstFloor.getPlanningImage().getId());
        assertEquals(expectedFirstFloor.getPlanningImage().getType(), actualFirstFloor.getPlanningImage().getType());
        assertEquals(expectedFirstFloor.getPlanningImage().getPath(), actualFirstFloor.getPlanningImage().getPath());

        assertEquals(expectedSecondFloor.getIndex(), actualSecondFloor.getIndex());
        assertEquals(expectedSecondFloor.getIsBasement(), actualSecondFloor.getIsBasement());
        assertEquals(expectedSecondFloor.getIsAttic(), actualSecondFloor.getIsAttic());
        assertEquals(expectedSecondFloor.getHeight(), actualSecondFloor.getHeight());
        assertEquals(expectedSecondFloor.getPlanningImage().getId(), actualSecondFloor.getPlanningImage().getId());
        assertEquals(expectedSecondFloor.getPlanningImage().getType(), actualSecondFloor.getPlanningImage().getType());
        assertEquals(expectedSecondFloor.getPlanningImage().getPath(), actualSecondFloor.getPlanningImage().getPath());    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create new project without detached entities.")
    public void givenProjectDtoWithoutDetachedEntities_whenCreate_thenReturnNewProject() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();
        // Projects count before creating
        assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

        ProjectDto expectedProject = createProjectWithOutDetachedEntities();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ProjectDto> entity = new HttpEntity<>(expectedProject, headers);

        ResponseEntity<ProjectDto> response = restTemplate.exchange(
                PROJECT_URL,
                HttpMethod.POST,
                entity,
                ProjectDto.class
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        List<Project> actualProjects = projectRepository.findAll();
        int expectedProjectsSizeAfterCreating = 1;
        int actualProjectsSizeAfterCreating = actualProjects.size();
        // Projects count after creating
        assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);

        ProjectDto actualProject = response.getBody();

        assertThat(actualProject)
                .usingRecursiveComparison()
                .ignoringFields("id", "images", "photos", "floors")
                .isEqualTo(expectedProject);

        assertTrue(actualProject.getFloors().isEmpty());
        assertTrue(actualProject.getImages().isEmpty());
        assertTrue(actualProject.getPhotos().isEmpty());
    }

    private String createUrl(String sort, String sortDirection) {
        String sortBy = "?sortBy=";
        String direction = "&sortDirection=";
        String template = "%s%s%s%s%s";
        return String.format(template, PROJECT_URL, sortBy, sort, direction, sortDirection);
    }

    private ProjectDto createProject() {
        return ProjectDto.builder()
                .title("Білий дім")
                .description("Тут живе Байден")
                .popularity(3)
                .generalArea(768.5)
                .timeToCreate(62)
                .projectPrice(BigDecimal.valueOf(120000.0))
                .livingArea(650.0)
                .buildingArea(598.5)
                .wallMaterial("кирпич")
                .wallThickness(BigDecimal.valueOf(0.5))
                .foundation("ленточный")
                .ceiling("комбинированная")
                .roof("битумная черепица")
                .buildingPrice(BigDecimal.valueOf(55998889.0))
                .insulation("минеральная вата")
                .insulationThickness(0.3)
                .length(55.8)
                .width(64.7)
                .style("современный")
                .isGaragePresent(false)
                .bedroomCount(24)
                .mainImage(createMainImageInfo())
                .images(createImages())
                .floors(createFloors())
                .build();
    }

    private ProjectDto createProjectWithOutDetachedEntities() {
        return ProjectDto.builder()
                .title("Білий дім")
                .description("Тут живе Байден")
                .popularity(3)
                .generalArea(768.5)
                .timeToCreate(62)
                .projectPrice(BigDecimal.valueOf(120000.0))
                .livingArea(650.0)
                .buildingArea(598.5)
                .wallMaterial("кирпич")
                .wallThickness(BigDecimal.valueOf(0.5))
                .foundation("ленточный")
                .ceiling("комбинированная")
                .roof("битумная черепица")
                .buildingPrice(BigDecimal.valueOf(55998889.0))
                .insulation("минеральная вата")
                .insulationThickness(0.3)
                .length(55.8)
                .width(64.7)
                .style("современный")
                .isGaragePresent(false)
                .bedroomCount(24)
                .build();
    }

    private ImageInfo createMainImageInfo() {
        return ImageInfo.builder()
                .id(3)
                .type("image")
                .path("http://127.0.0.1:51774/my-s3-bucket/3")
                .build();
    }

    private List<ImageInfo> createImages() {
        return List.of(
                ImageInfo.builder()
                        .id(5)
                        .type("image")
                        .path("http://127.0.0.1:51774/my-s3-bucket/5")
                        .build(),
                ImageInfo.builder()
                        .id(7)
                        .type("image")
                        .path("http://127.0.0.1:51774/my-s3-bucket/7")
                        .build());
    }

    private List<FloorDto> createFloors() {
        return List.of(
                FloorDto.builder()
                        .index(0)
                        .area(84.5)
                        .isAttic(false)
                        .isBasement(true)
                        .height(2.8)
                        .planningImage(ImageInfo.builder()
                                .id(6)
                                .type("image")
                                .path("http://127.0.0.1:51774/my-s3-bucket/6")
                                .build())
                        .build(),
                FloorDto.builder()
                        .index(1)
                        .area(298.2)
                        .isAttic(true)
                        .isBasement(false)
                        .height(223.5)
                        .planningImage(ImageInfo.builder()
                                .id(2)
                                .type("image")
                                .path("http://127.0.0.1:51774/my-s3-bucket/2")
                                .build())
                        .build());
    }
}
