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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(1).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(THIRD_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(FOURTH_PROJECT_ID, actualProjects.get(1).getId());
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(2).getId());
        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(3).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
        Assertions.assertEquals(FOURTH_PROJECT_ID, actualProjects.get(2).getId());
        Assertions.assertEquals(THIRD_PROJECT_ID, actualProjects.get(3).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(THIRD_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(FOURTH_PROJECT_ID, actualProjects.get(1).getId());
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(2).getId());
        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(3).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
        Assertions.assertEquals(FOURTH_PROJECT_ID, actualProjects.get(2).getId());
        Assertions.assertEquals(THIRD_PROJECT_ID, actualProjects.get(3).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(THIRD_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(FOURTH_PROJECT_ID, actualProjects.get(1).getId());
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(2).getId());
        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(3).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(1).getId());
        Assertions.assertEquals(FOURTH_PROJECT_ID, actualProjects.get(2).getId());
        Assertions.assertEquals(THIRD_PROJECT_ID, actualProjects.get(3).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ProjectDto> actualProjects = response.getBody();

        assertThat(actualProjects)
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyElementsOf(expectedProjects);

        Assertions.assertEquals(FIRST_PROJECT_ID, actualProjects.get(0).getId());
        Assertions.assertEquals(SECOND_PROJECT_ID, actualProjects.get(1).getId());
        Assertions.assertEquals(THIRD_PROJECT_ID, actualProjects.get(2).getId());
        Assertions.assertEquals(FOURTH_PROJECT_ID, actualProjects.get(3).getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ProjectDto project = response.getBody();

        ImageInfo actualMainImage = project.getMainImage();
        List<ImageInfo> actualImages = project.getImages();
        List<FloorDto> actualFloors = project.getFloors();

        Assertions.assertEquals(expectedProjectId, project.getId());
        Assertions.assertNotNull(actualMainImage);
        Assertions.assertNotNull(actualImages);
        Assertions.assertNotNull(actualFloors);
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

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ErrorResponse errorResponse = response.getBody();
        Assertions.assertEquals(expectedErrorMessage, errorResponse.message());
        Assertions.assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.statusCode());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/deleteProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - delete project by id.")
    void givenProjects_whenDelete_thenRemoveProjectFromDB() {

        List<ProjectDto> beforeRemove = projectService.findAll(ID, ASC);

        Assertions.assertEquals(2, beforeRemove.size());

        ResponseEntity<Void> response = restTemplate.exchange(
                PROJECT_URL + '/' + FIRST_PROJECT_ID,
                HttpMethod.DELETE,
                null,
                Void.class
        );

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNull(response.getBody());

        List<ProjectDto> afterRemove = projectService.findAll(ID, ASC);
        Assertions.assertEquals(1, afterRemove.size());

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

        Assertions.assertEquals(expectedProjectsSizeBeforeDelete, actualProjectsSizeBeforeDelete);

        ResponseEntity<ErrorResponse> response = restTemplate.exchange(
                PROJECT_URL + '/' + THIRD_PROJECT_ID,
                HttpMethod.DELETE,
                null,
                new ParameterizedTypeReference<>() {}
        );

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        int actualProjectsSizeAfterDelete = projectRepository.findAll().size();
        Assertions.assertEquals(expectedProjectsSizeBeforeDelete, actualProjectsSizeAfterDelete);

        ErrorResponse errorResponse = response.getBody();
        Assertions.assertEquals(expectedErrorMessage, errorResponse.message());
        Assertions.assertEquals(HttpStatus.NOT_FOUND.value(), errorResponse.statusCode());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ProjectDto updatedProject = response.getBody();

        // Assert it same project
        Assertions.assertEquals(projectBeforeUpdate.getId(), updatedProject.getId());

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
        Image mainImageBeforeUpdate = imageService.findMainImage(projectBeforeUpdate.getId());
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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ProjectDto updatedProject = response.getBody();

        // Assert main image
        ImageInfo newMainImage = updatedProject.getMainImage();

        Assertions.assertNotEquals(mainImageBeforeUpdate.getId(), newMainImage.getId());
        Assertions.assertNotEquals(mainImageBeforeUpdate.getPath(), newMainImage.getPath());
        Assertions.assertEquals(mainImageBeforeUpdate.getType(), newMainImage.getType());

        // Assert images
        int expectedImagesSize = 2;
        List<ImageInfo> actualImages = updatedProject.getImages();
        Image firstImage = imageMapper.toImage(actualImages.get(0));
        Image secondImage = imageMapper.toImage(actualImages.get(1));

        int imagesSizeAfterUpdate = actualImages.size();
        List<ImageInfo> expectedImages = createImages();

        Assertions.assertEquals(expectedImagesSize, imagesSizeAfterUpdate);

        Assertions.assertEquals(expectedImages.get(0).getPath(), actualImages.get(0).getPath());
        Assertions.assertEquals(expectedImages.get(0).getType(), actualImages.get(0).getType());
        Assertions.assertEquals(expectedImages.get(1).getPath(), actualImages.get(1).getPath());
        Assertions.assertEquals(expectedImages.get(1).getType(), actualImages.get(1).getType());

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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

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

        Assertions.assertEquals(expectedFloorSize, actualFloorSize);
        // first floor
        Assertions.assertEquals(firstExpectedFloor.getIndex(), firstActualFloor.getIndex());
        Assertions.assertEquals(firstExpectedFloor.getArea(), firstActualFloor.getArea());
        Assertions.assertEquals(firstExpectedFloor.getHeight(), firstActualFloor.getHeight());
        Assertions.assertEquals(firstExpectedFloor.getIsAttic(), firstActualFloor.getIsAttic());
        Assertions.assertEquals(firstExpectedFloor.getIsBasement(), firstActualFloor.getIsBasement());

        Assertions.assertEquals(firstExpectedFloor.getPlanningImage().getId(), firstActualFloor.getPlanningImage().getId());
        Assertions.assertEquals(firstExpectedFloor.getPlanningImage().getPath(), firstActualFloor.getPlanningImage().getPath());
        Assertions.assertEquals(firstExpectedFloor.getPlanningImage().getType(), firstActualFloor.getPlanningImage().getType());
        // second floor
        Assertions.assertEquals(secondExpectedFloor.getIndex(), secondActualFloor.getIndex());
        Assertions.assertEquals(secondExpectedFloor.getArea(), secondActualFloor.getArea());
        Assertions.assertEquals(secondExpectedFloor.getHeight(), secondActualFloor.getHeight());
        Assertions.assertEquals(secondExpectedFloor.getIsAttic(), secondActualFloor.getIsAttic());
        Assertions.assertEquals(secondExpectedFloor.getIsBasement(), secondActualFloor.getIsBasement());

        Assertions.assertEquals(firstExpectedFloor.getPlanningImage().getId(), firstActualFloor.getPlanningImage().getId());
        Assertions.assertEquals(firstExpectedFloor.getPlanningImage().getPath(), firstActualFloor.getPlanningImage().getPath());
        Assertions.assertEquals(firstExpectedFloor.getPlanningImage().getType(), firstActualFloor.getPlanningImage().getType());
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

        Assertions.assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert fields
        Assertions.assertEquals(FIRST_PROJECT_ID, actualProject.getId());
        Assertions.assertEquals(expectedProject.getTitle(), actualProject.getTitle());
        Assertions.assertEquals(expectedProject.getDescription(), actualProject.getDescription());
        Assertions.assertEquals(expectedProject.getPopularity(), actualProject.getPopularity());
        Assertions.assertEquals(expectedProject.getGeneralArea(), actualProject.getGeneralArea());
        Assertions.assertEquals(expectedProject.getTimeToCreate(), actualProject.getTimeToCreate());
        Assertions.assertEquals(expectedProject.getProjectPrice(), actualProject.getProjectPrice());
        Assertions.assertEquals(expectedProject.getLivingArea(), actualProject.getLivingArea());
        Assertions.assertEquals(expectedProject.getBuildingArea(), actualProject.getBuildingArea());
        Assertions.assertEquals(expectedProject.getWallThickness(), actualProject.getWallThickness());
        Assertions.assertEquals(expectedProject.getBuildingPrice(), actualProject.getBuildingPrice());
        Assertions.assertEquals(expectedProject.getInsulationThickness(), actualProject.getInsulationThickness());
        Assertions.assertEquals(expectedProject.getLength(), actualProject.getLength());
        Assertions.assertEquals(expectedProject.getWidth(), actualProject.getWidth());
        Assertions.assertEquals(expectedProject.getIsGaragePresent(), actualProject.getIsGaragePresent());
        Assertions.assertEquals(expectedProject.getBedroomCount(), actualProject.getBedroomCount());

        int expectedProjectsSizeAfterCreating = 1;
        int actualProjectsSizeAfterCreating = projectRepository.findAll().size();
        Assertions.assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create project, check options.")
    public void givenProjectDto_whenCreate_thenReturnNewProjectCheckOptions() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();

        Assertions.assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert options
        Assertions.assertEquals(expectedProject.getWallMaterial(), actualProject.getWallMaterial());
        Assertions.assertEquals(expectedProject.getFoundation(), actualProject.getFoundation());
        Assertions.assertEquals(expectedProject.getCeiling(), actualProject.getCeiling());
        Assertions.assertEquals(expectedProject.getRoof(), actualProject.getRoof());
        Assertions.assertEquals(expectedProject.getInsulation(), actualProject.getInsulation());
        Assertions.assertEquals(expectedProject.getStyle(), actualProject.getStyle());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create project, check images.")
    public void givenProjectDto_whenCreate_thenReturnNewProjectCheckImages() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();

        Assertions.assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert images
        String expectedMainImageType = "main";
        String expectedImageType = "image";
        Assertions.assertNotNull(actualProject.getMainImage());
        Assertions.assertNotNull(actualProject.getImages());
        Assertions.assertNotNull(actualProject.getFloors());

        ImageInfo expectedMainImage = expectedProject.getMainImage();
        ImageInfo actualMainImage = actualProject.getMainImage();
        Assertions.assertEquals(expectedMainImage.getPath(), actualMainImage.getPath());
        Assertions.assertEquals(expectedMainImageType, actualMainImage.getType());

        int expectedImageSize = 2;
        List<ImageInfo> expectedImages = expectedProject.getImages();
        List<ImageInfo> actualImages = actualProject.getImages();
        Assertions.assertEquals(expectedImages.get(0).getPath(), actualImages.get(0).getPath());
        Assertions.assertEquals(expectedImageType, actualImages.get(0).getType());
        Assertions.assertEquals(expectedImages.get(1).getPath(), actualImages.get(1).getPath());
        Assertions.assertEquals(expectedImageType, actualImages.get(1).getType());
        Assertions.assertEquals(expectedImageSize, actualProject.getImages().size());
    }

    @Test
    @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - create project, check floors.")
    public void givenProjectDto_whenCreate_thenReturnNewProjectCheckFloors() {
        List<Project> project = projectRepository.findAll();
        int expectedProjectsSizeBeforeCreating = 0;
        int actualProjectsSizeBeforeCreating = project.size();

        Assertions.assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

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

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ProjectDto actualProject = response.getBody();

        // Assert floors
        int expectedFloorSize = 2;
        Assertions.assertEquals(expectedFloorSize, actualProject.getFloors().size());

        List<FloorDto> expectedFloors = expectedProject.getFloors();
        FloorDto expectedFirstFloor = expectedFloors.get(0);
        FloorDto expectedSecondFloor = expectedFloors.get(1);

        List<FloorDto> actualFloors = actualProject.getFloors();
        FloorDto actualFirstFloor = actualFloors.get(0);
        FloorDto actualSecondFloor = actualFloors.get(1);
        Assertions.assertEquals(expectedFirstFloor.getIndex(), actualFirstFloor.getIndex());
        Assertions.assertEquals(expectedFirstFloor.getIsBasement(), actualFirstFloor.getIsBasement());
        Assertions.assertEquals(expectedFirstFloor.getIsAttic(), actualFirstFloor.getIsAttic());
        Assertions.assertEquals(expectedFirstFloor.getHeight(), actualFirstFloor.getHeight());
        Assertions.assertEquals(expectedFirstFloor.getPlanningImage().getId(), actualFirstFloor.getPlanningImage().getId());
        Assertions.assertEquals(expectedFirstFloor.getPlanningImage().getType(), actualFirstFloor.getPlanningImage().getType());
        Assertions.assertEquals(expectedFirstFloor.getPlanningImage().getPath(), actualFirstFloor.getPlanningImage().getPath());

        Assertions.assertEquals(expectedSecondFloor.getIndex(), actualSecondFloor.getIndex());
        Assertions.assertEquals(expectedSecondFloor.getIsBasement(), actualSecondFloor.getIsBasement());
        Assertions.assertEquals(expectedSecondFloor.getIsAttic(), actualSecondFloor.getIsAttic());
        Assertions.assertEquals(expectedSecondFloor.getHeight(), actualSecondFloor.getHeight());
        Assertions.assertEquals(expectedSecondFloor.getPlanningImage().getId(), actualSecondFloor.getPlanningImage().getId());
        Assertions.assertEquals(expectedSecondFloor.getPlanningImage().getType(), actualSecondFloor.getPlanningImage().getType());
        Assertions.assertEquals(expectedSecondFloor.getPlanningImage().getPath(), actualSecondFloor.getPlanningImage().getPath());    }

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

    private ImageInfo createImageInfo() {
        return ImageInfo.builder()
                .id(6)
                .type("image")
                .path("http://127.0.0.1:51774/my-s3-bucket/6")
                .build();
    }

    private ImageInfo createMainImageInfo() {
        return ImageInfo.builder()
                .id(3)
                .type("main")
                .path("http://127.0.0.1:51774/my-s3-bucket/3")
                .build();
    }

    private Image createImage() {
        return new Image();
    }

    private List<ImageInfo> createImages() {
        return List.of(
                ImageInfo.builder()
                        .id(6)
                        .type("image")
                        .path("http://127.0.0.1:51774/my-s3-bucket/6")
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
                                .id(7)
                                .type("image")
                                .path("http://127.0.0.1:51774/my-s3-bucket/7")
                                .build())
                        .build());
    }
}
