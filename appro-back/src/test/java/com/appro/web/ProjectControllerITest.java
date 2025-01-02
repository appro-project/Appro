package com.appro.web;

import com.appro.AbstractAmazonS3ITest;
import com.appro.dto.FloorDto;
import com.appro.dto.ImageInfo;
import com.appro.dto.ProjectDto;
import com.appro.dto.project_options.*;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.exception.ProjectNotFoundException;
import com.appro.mapper.FloorMapper;
import com.appro.mapper.ImageMapper;
import com.appro.repository.ProjectRepository;
import com.appro.service.ProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.ttddyy.dsproxy.QueryCount;
import net.ttddyy.dsproxy.QueryCountHolder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
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

    private static final String PROJECT_URL = "/api/v1/project/";

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private FloorMapper floorMapper;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Sql(scripts = "classpath:sql/project/insert_projects.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'id' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByIdDirectionASC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(ID, ASC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(SECOND_PROJECT_ID));

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 5 ?
        assertEquals(5, totalQueryCount);
        assertEquals(5, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/insert_projects.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'id' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByIdDirectionDESC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(ID, DESC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(SECOND_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(FIRST_PROJECT_ID));
        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 5 ?
        assertEquals(5, totalQueryCount);
        assertEquals(5, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'popularity' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByPopularityDirectionASC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(POPULARITY, ASC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id").value(THIRD_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(FOURTH_PROJECT_ID))
                .andExpect(jsonPath("$[2].id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$[3].id").value(SECOND_PROJECT_ID));

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 9 ?
        assertEquals(9, totalQueryCount);
        assertEquals(9, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'popularity' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByPopularityDirectionDESC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(POPULARITY, DESC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id").value(SECOND_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$[2].id").value(FOURTH_PROJECT_ID))
                .andExpect(jsonPath("$[3].id").value(THIRD_PROJECT_ID));

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 9 ?
        assertEquals(9, totalQueryCount);
        assertEquals(9, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'general area' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByGeneralAreaDirectionASC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(GENERAL_AREA, ASC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id").value(THIRD_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(FOURTH_PROJECT_ID))
                .andExpect(jsonPath("$[2].id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$[3].id").value(SECOND_PROJECT_ID));
        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 9 ?
        assertEquals(9, totalQueryCount);
        assertEquals(9, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'general area' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByGeneralAreaDirectionDESC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(GENERAL_AREA, DESC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id").value(SECOND_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$[2].id").value(FOURTH_PROJECT_ID))
                .andExpect(jsonPath("$[3].id").value(THIRD_PROJECT_ID));

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 9 ?
        assertEquals(9, totalQueryCount);
        assertEquals(9, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'project price' direction 'ASC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByProjectPriceDirectionASC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(PROJECT_PRICE, ASC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id").value(THIRD_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(FOURTH_PROJECT_ID))
                .andExpect(jsonPath("$[2].id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$[3].id").value(SECOND_PROJECT_ID));

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 9 ?
        assertEquals(9, totalQueryCount);
        assertEquals(9, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjects_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find all projects, sort by 'project price' direction 'DESC'.")
    void givenProjects_whenFindAll_thenReturnProjectsSortByProjectPriceDirectionDESC() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(PROJECT_PRICE, DESC))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[0].id").value(SECOND_PROJECT_ID))
                .andExpect(jsonPath("$[1].id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$[2].id").value(FOURTH_PROJECT_ID))
                .andExpect(jsonPath("$[3].id").value(THIRD_PROJECT_ID));

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        // todo why 9 ?
        assertEquals(9, totalQueryCount);
        assertEquals(9, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjectById_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find project by id with additional data.")
    void givenProject_whenFindById_thenReturnProjectWithAdditionalData() throws Exception {
        QueryCountHolder.clear();
        // todo: add planning image
        mockMvc.perform(get(createUrl(FIRST_PROJECT_ID))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(FIRST_PROJECT_ID))
                .andExpect(jsonPath("$.images").exists())
                .andExpect(jsonPath("$.images", hasSize(1)))
                .andExpect(jsonPath("$.mainImage").exists())
                .andExpect(jsonPath("$.images[0].id", is(1)))
                .andExpect(jsonPath("$.images[0].path", is("http://127.0.0.1:51774/my-s3-bucket/1")))
                .andExpect(jsonPath("$.images[0].type", is("image")))
                .andExpect(jsonPath("$.floors").exists())
                .andExpect(jsonPath("$.floors[0].id", is(1)))
                .andExpect(jsonPath("$.floors[0].isAttic", is(false)))
                .andExpect(jsonPath("$.floors[0].isBasement", is(true)))
                .andExpect(jsonPath("$.floors[0].area", is(84.0)))
                .andExpect(jsonPath("$.floors[0].height", is(2.5)));

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        assertEquals(3, totalQueryCount);
        assertEquals(3, selectQueryCount); // todo: better 1
    }

    @Test
    @Sql(scripts = "classpath:sql/project/findProjectById_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - find project by id with additional data.")
    void givenProject_whenFindById_thenThrowNotFoundException() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(get(createUrl(SECOND_PROJECT_ID))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        // Assert queries:
        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();

        assertEquals(1, totalQueryCount);
        assertEquals(1, selectQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/deleteProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - delete project by id.")
    void givenProjects_whenDelete_thenRemoveProjectFromDB() throws Exception {
        List<ProjectDto> beforeRemove = projectService.findAll(ID, ASC);
        assertEquals(2, beforeRemove.size());

        mockMvc.perform(delete(createUrl(FIRST_PROJECT_ID))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        List<ProjectDto> afterRemove = projectService.findAll(ID, ASC);
        assertEquals(1, afterRemove.size());

        Assertions.assertThrows(ProjectNotFoundException.class, () -> projectService.findProjectFullInfo(FIRST_PROJECT_ID));
    }

    @Test
    @Sql(scripts = "classpath:sql/project/deleteProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - delete project by id.")
    void givenProjects_whenDelete_thenRemoveProjectFromDBCountQueries() throws Exception {
        QueryCountHolder.clear();

        mockMvc.perform(delete(createUrl(FIRST_PROJECT_ID))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        QueryCount queryCount = QueryCountHolder.getGrandTotal();
        int totalQueryCount = (int) queryCount.getTotal();
        int selectQueryCount = (int) queryCount.getSelect();
        int deleteQueryCount = (int) queryCount.getDelete();
        int updateQueryCount = (int) queryCount.getUpdate();

        // todo: why?
        assertEquals(3, totalQueryCount);
        assertEquals(2, selectQueryCount);
        assertEquals(0, deleteQueryCount);
        assertEquals(1, updateQueryCount);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/deleteProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - delete project by not existing id.")
    void givenProjects_whenDelete_thenThrowProjectNotFoundException() throws Exception {
        String expectedErrorMessage = "Project with id: 3 does not exist";
        int expectedProjectsSizeBeforeDelete = 2;
        int actualProjectsSizeBeforeDelete = projectRepository.findAll().size();

        assertEquals(expectedProjectsSizeBeforeDelete, actualProjectsSizeBeforeDelete);

        mockMvc.perform(delete(createUrl(THIRD_PROJECT_ID)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(expectedErrorMessage))
                .andExpect(jsonPath("$.statusCode").value(HttpStatus.NOT_FOUND.value()));

        int actualProjectsSizeAfterDelete = projectRepository.findAll().size();
        assertEquals(expectedProjectsSizeBeforeDelete, actualProjectsSizeAfterDelete);
    }

    @Test
    @Sql(scripts = "classpath:sql/project/updateProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - update project attributes")
    void givenProject_whenUpdate_thenModifyProjectAttributes() throws Exception {
        Project projectBeforeUpdate = projectRepository.findById(FIRST_PROJECT_ID).orElse(null);
        assertNotNull(projectBeforeUpdate);

        ProjectDto updateProjectRequestBody = createProject();
        updateProjectRequestBody.setShowOnMain(true);
        updateProjectRequestBody.setIsFinished(true);

        String projectJson = objectMapper.writeValueAsString(updateProjectRequestBody);

        mockMvc.perform(put(createUrl(FIRST_PROJECT_ID))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(projectBeforeUpdate.getId()))
                .andExpect(jsonPath("$.title").value(updateProjectRequestBody.getTitle()))
                .andExpect(jsonPath("$.descriptionRU").value(updateProjectRequestBody.getDescriptionRU()))
                .andExpect(jsonPath("$.descriptionUA").value(updateProjectRequestBody.getDescriptionUA()))
                .andExpect(jsonPath("$.popularity").value(updateProjectRequestBody.getPopularity()))
                .andExpect(jsonPath("$.generalArea").value(updateProjectRequestBody.getGeneralArea()))
                .andExpect(jsonPath("$.timeToCreate").value(updateProjectRequestBody.getTimeToCreate()))
                .andExpect(jsonPath("$.livingArea").value(updateProjectRequestBody.getLivingArea()))
                .andExpect(jsonPath("$.wallMaterial").value(updateProjectRequestBody.getWallMaterial().name()))
                .andExpect(jsonPath("$.wallThickness").value(updateProjectRequestBody.getWallThickness()))
                .andExpect(jsonPath("$.foundation").value(updateProjectRequestBody.getFoundation().name()))
                .andExpect(jsonPath("$.ceiling").value(updateProjectRequestBody.getCeiling().name()))
                .andExpect(jsonPath("$.roof").value(updateProjectRequestBody.getRoof().name()))
                .andExpect(jsonPath("$.buildingPrice").value(updateProjectRequestBody.getBuildingPrice()))
                .andExpect(jsonPath("$.insulation").value(updateProjectRequestBody.getInsulation().name()))
                .andExpect(jsonPath("$.insulationThickness").value(updateProjectRequestBody.getInsulationThickness()))
                .andExpect(jsonPath("$.length").value(updateProjectRequestBody.getLength()))
                .andExpect(jsonPath("$.width").value(updateProjectRequestBody.getWidth()))
                .andExpect(jsonPath("$.style").value(updateProjectRequestBody.getStyle().name()))
                .andExpect(jsonPath("$.isGaragePresent").value(updateProjectRequestBody.getIsGaragePresent()))
                .andExpect(jsonPath("$.bedroomCount").value(updateProjectRequestBody.getBedroomCount()))
                .andExpect(jsonPath("$.showOnMain", is(true)))
                .andExpect(jsonPath("$.isFinished", is(true)));

        Project projectAfterUpdate = projectRepository.findById(FIRST_PROJECT_ID).orElse(null);
        assertNotNull(projectAfterUpdate);

        // Assert attributes are updated
        assertNotEquals(projectBeforeUpdate.getTitle(), projectAfterUpdate.getTitle());
        assertNotEquals(projectBeforeUpdate.getDescriptionRU(), projectAfterUpdate.getDescriptionRU());
        assertNotEquals(projectBeforeUpdate.getDescriptionUA(), projectAfterUpdate.getDescriptionUA());
        assertNotEquals(projectBeforeUpdate.getPopularity(), projectAfterUpdate.getPopularity());
        assertNotEquals(projectBeforeUpdate.getGeneralArea(), projectAfterUpdate.getGeneralArea());
        assertNotEquals(projectBeforeUpdate.getTimeToCreate(), projectAfterUpdate.getTimeToCreate());
        assertNotEquals(projectBeforeUpdate.getLivingArea(), projectAfterUpdate.getLivingArea());
        assertNotEquals(projectBeforeUpdate.getWallMaterial().toValue(), projectAfterUpdate.getWallMaterial().toValue());
        assertNotEquals(projectBeforeUpdate.getWallThickness(), projectAfterUpdate.getWallThickness());
        assertNotEquals(projectBeforeUpdate.getFoundation().toValue(), projectAfterUpdate.getFoundation().toValue());
        assertNotEquals(projectBeforeUpdate.getCeiling().toValue(), projectAfterUpdate.getCeiling().toValue());
        assertNotEquals(projectBeforeUpdate.getRoof().toValue(), projectAfterUpdate.getRoof().toValue());
        assertNotEquals(projectBeforeUpdate.getBuildingPrice(), projectAfterUpdate.getBuildingPrice());
        assertNotEquals(projectBeforeUpdate.getInsulation().toValue(), projectAfterUpdate.getInsulation().toValue());
        assertNotEquals(projectBeforeUpdate.getInsulationThickness(), projectAfterUpdate.getInsulationThickness());
        assertNotEquals(projectBeforeUpdate.getLength(), projectAfterUpdate.getLength());
        assertNotEquals(projectBeforeUpdate.getWidth(), projectAfterUpdate.getWidth());
        assertNotEquals(projectBeforeUpdate.getStyle().toValue(), projectAfterUpdate.getStyle().toValue());
        assertNotEquals(projectBeforeUpdate.getIsGaragePresent(), projectAfterUpdate.getIsGaragePresent());
        assertNotEquals(projectBeforeUpdate.getBedroomCount(), projectAfterUpdate.getBedroomCount());
    }

        @Test
        @Sql(scripts = "classpath:sql/project/updateProject_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
        @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
        @DisplayName("Test - update project images")
        void givenProject_whenUpdate_thenModifyProjectImages() throws Exception {
            Project projectBeforeUpdate = projectRepository.findById(FIRST_PROJECT_ID).orElse(null);
            assert projectBeforeUpdate != null;

            Image mainImageBeforeUpdate = projectBeforeUpdate.getImages().stream()
                    .filter(image -> image.getType().equals("main"))
                    .findFirst()
                    .orElse(null);
            List<Image> imagesBeforeUpdate = projectBeforeUpdate.getImages();

            ProjectDto updateProjectRequestBody = createProject();

            String projectJson = objectMapper.writeValueAsString(updateProjectRequestBody);

            assert mainImageBeforeUpdate != null;
            mockMvc.perform(put(createUrl(FIRST_PROJECT_ID))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.mainImage.id").value(not(mainImageBeforeUpdate.getId())))
                    .andExpect(jsonPath("$.mainImage.path").value(not(mainImageBeforeUpdate.getPath())))
                    .andExpect(jsonPath("$.mainImage.type").value(mainImageBeforeUpdate.getType()))
                    .andExpect(jsonPath("$.images", hasSize(2)))
                    .andExpect(jsonPath("$.images[0].id", is(5)))
                    .andExpect(jsonPath("$.images[0].path", is("http://127.0.0.1:51774/my-s3-bucket/5")))
                    .andExpect(jsonPath("$.images[0].type", is("image")))
                    .andExpect(jsonPath("$.images[1].id", is(8)))
                    .andExpect(jsonPath("$.images[1].path", is("http://127.0.0.1:51774/my-s3-bucket/8")))
                    .andExpect(jsonPath("$.images[1].type", is("image")));

            String responseJson = mockMvc.perform(put(createUrl(FIRST_PROJECT_ID))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andReturn()
                    .getResponse()
                    .getContentAsString();

            ProjectDto updatedProject = objectMapper.readValue(responseJson, ProjectDto.class);

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
        void givenProject_whenUpdate_thenModifyProjectFloors() throws Exception {
            Project projectBeforeUpdate = projectRepository.findById(FIRST_PROJECT_ID).orElse(null);
            assert projectBeforeUpdate != null;
            List<Floor> floorsBeforeUpdate = projectBeforeUpdate.getFloors();

            ProjectDto updateProjectRequestBody = createProject();

            String projectJson = objectMapper.writeValueAsString(updateProjectRequestBody);

            String responseJson = mockMvc.perform(put(createUrl(FIRST_PROJECT_ID))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.floors", hasSize(2)))
                    .andExpect(jsonPath("$.floors[0].planningImage.id", is(6)))
                    .andExpect(jsonPath("$.floors[0].planningImage.path", is("http://127.0.0.1:51774/my-s3-bucket/6")))
                    .andExpect(jsonPath("$.floors[0].planningImage.type", is("image")))
                    .andExpect(jsonPath("$.floors[1].planningImage.id", is(7)))
                    .andExpect(jsonPath("$.floors[1].planningImage.path", is("http://127.0.0.1:51774/my-s3-bucket/7")))
                    .andExpect(jsonPath("$.floors[1].planningImage.type", is("image")))
                    .andReturn()
                    .getResponse()
                    .getContentAsString();

            ProjectDto updatedProject = objectMapper.readValue(responseJson, ProjectDto.class);

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

            assertEquals(secondExpectedFloor.getPlanningImage().getId(), secondActualFloor.getPlanningImage().getId());
            assertEquals(secondExpectedFloor.getPlanningImage().getPath(), secondActualFloor.getPlanningImage().getPath());
            assertEquals(secondExpectedFloor.getPlanningImage().getType(), secondActualFloor.getPlanningImage().getType());

            Assertions.assertFalse(floorsBeforeUpdate.contains(floorMapper.toFloor(firstActualFloor)));
            Assertions.assertFalse(floorsBeforeUpdate.contains(floorMapper.toFloor(secondActualFloor)));
        }

        @Test
        @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
        @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
        @DisplayName("Test - create project, check fields.")
        public void givenProjectDto_whenCreate_thenReturnNewProjectCheckFields() throws Exception {
            List<Project> project = projectRepository.findAll();
            int expectedProjectsSizeBeforeCreating = 0;
            int actualProjectsSizeBeforeCreating = project.size();

            assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

            ProjectDto expectedProject = createFullProject(null, null, null);

            String projectJson = objectMapper.writeValueAsString(expectedProject);

            mockMvc.perform(post(PROJECT_URL.substring(0, PROJECT_URL.length() - 1))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(FIRST_PROJECT_ID))
                    .andExpect(jsonPath("$.title").value(expectedProject.getTitle()))
                    .andExpect(jsonPath("$.descriptionRU").value(expectedProject.getDescriptionRU()))
                    .andExpect(jsonPath("$.descriptionUA").value(expectedProject.getDescriptionUA()))
                    .andExpect(jsonPath("$.popularity").value(expectedProject.getPopularity()))
                    .andExpect(jsonPath("$.generalArea").value(expectedProject.getGeneralArea()))
                    .andExpect(jsonPath("$.timeToCreate").value(expectedProject.getTimeToCreate()))
                    .andExpect(jsonPath("$.projectPrice").value(expectedProject.getProjectPrice()))
                    .andExpect(jsonPath("$.livingArea").value(expectedProject.getLivingArea()))
                    .andExpect(jsonPath("$.buildingArea").value(expectedProject.getBuildingArea()))
                    .andExpect(jsonPath("$.wallThickness").value(expectedProject.getWallThickness()))
                    .andExpect(jsonPath("$.buildingPrice").value(expectedProject.getBuildingPrice()))
                    .andExpect(jsonPath("$.insulationThickness").value(expectedProject.getInsulationThickness()))
                    .andExpect(jsonPath("$.length").value(expectedProject.getLength()))
                    .andExpect(jsonPath("$.width").value(expectedProject.getWidth()))
                    .andExpect(jsonPath("$.isGaragePresent").value(expectedProject.getIsGaragePresent()))
                    .andExpect(jsonPath("$.bedroomCount").value(expectedProject.getBedroomCount()))
                    .andReturn()
                    .getResponse()
                    .getContentAsString();

            int expectedProjectsSizeAfterCreating = 1;
            int actualProjectsSizeAfterCreating = projectRepository.findAll().size();
            assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);
        }

        @Test
        @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
        @DisplayName("Test - create project, check options.")
        public void givenProjectDto_whenCreate_thenReturnNewProjectCheckOptions() throws Exception {
            List<Project> project = projectRepository.findAll();
            int expectedProjectsSizeBeforeCreating = 0;
            int actualProjectsSizeBeforeCreating = project.size();

            assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

            ProjectDto expectedProject = createFullProject(null, null, null);

            String projectJson = objectMapper.writeValueAsString(expectedProject);

            mockMvc.perform(post(PROJECT_URL.substring(0, PROJECT_URL.length() - 1))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.wallMaterial").value(expectedProject.getWallMaterial().name()))
                    .andExpect(jsonPath("$.foundation").value(expectedProject.getFoundation().name()))
                    .andExpect(jsonPath("$.ceiling").value(expectedProject.getCeiling().name()))
                    .andExpect(jsonPath("$.roof").value(expectedProject.getRoof().name()))
                    .andExpect(jsonPath("$.insulation").value(expectedProject.getInsulation().name()))
                    .andExpect(jsonPath("$.style").value(expectedProject.getStyle().name()));

            int expectedProjectsSizeAfterCreating = 1;
            int actualProjectsSizeAfterCreating = projectRepository.findAll().size();
            assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);
        }

        @Test
        @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
        @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
        @DisplayName("Test - create project, check images.")
        public void givenProjectDto_whenCreate_thenReturnNewProjectCheckImages() throws Exception {
            List<Project> project = projectRepository.findAll();
            int expectedProjectsSizeBeforeCreating = 0;
            int actualProjectsSizeBeforeCreating = project.size();

            assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

            ProjectDto expectedProject = createFullProject(createMainImageInfo(), createImages(), null);

            String projectJson = objectMapper.writeValueAsString(expectedProject);

            mockMvc.perform(post(PROJECT_URL.substring(0, PROJECT_URL.length() - 1))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.mainImage.path").value(expectedProject.getMainImage().getPath()))
                    .andExpect(jsonPath("$.mainImage.type").value("main"))
                    .andExpect(jsonPath("$.images", hasSize(2)))
                    .andExpect(jsonPath("$.images[0].path").value(expectedProject.getImages().get(0).getPath()))
                    .andExpect(jsonPath("$.images[0].type").value("image"))
                    .andExpect(jsonPath("$.images[1].path").value(expectedProject.getImages().get(1).getPath()))
                    .andExpect(jsonPath("$.images[1].type").value("image"));

            int expectedProjectsSizeAfterCreating = 1;
            int actualProjectsSizeAfterCreating = projectRepository.findAll().size();
            assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);
        }

        @Test
        @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
        @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
        @DisplayName("Test - create project, check floors.")
        public void givenProjectDto_whenCreate_thenReturnNewProjectCheckFloors() throws Exception {
            List<Project> project = projectRepository.findAll();
            int expectedProjectsSizeBeforeCreating = 0;
            int actualProjectsSizeBeforeCreating = project.size();

            assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

            ProjectDto expectedProject = createFullProject(null, null, createFloors());

            String projectJson = objectMapper.writeValueAsString(expectedProject);

            mockMvc.perform(post(PROJECT_URL.substring(0, PROJECT_URL.length() - 1))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.floors", hasSize(2)))
                    .andExpect(jsonPath("$.floors[0].index").value(expectedProject.getFloors().get(0).getIndex()))
                    .andExpect(jsonPath("$.floors[0].isBasement").value(expectedProject.getFloors().get(0).getIsBasement()))
                    .andExpect(jsonPath("$.floors[0].isAttic").value(expectedProject.getFloors().get(0).getIsAttic()))
                    .andExpect(jsonPath("$.floors[0].height").value(expectedProject.getFloors().get(0).getHeight()))
                    .andExpect(jsonPath("$.floors[0].planningImage.id").value(expectedProject.getFloors().get(0).getPlanningImage().getId()))
                    .andExpect(jsonPath("$.floors[0].planningImage.type").value(expectedProject.getFloors().get(0).getPlanningImage().getType()))
                    .andExpect(jsonPath("$.floors[0].planningImage.path").value(expectedProject.getFloors().get(0).getPlanningImage().getPath()))
                    .andExpect(jsonPath("$.floors[1].index").value(expectedProject.getFloors().get(1).getIndex()))
                    .andExpect(jsonPath("$.floors[1].isBasement").value(expectedProject.getFloors().get(1).getIsBasement()))
                    .andExpect(jsonPath("$.floors[1].isAttic").value(expectedProject.getFloors().get(1).getIsAttic()))
                    .andExpect(jsonPath("$.floors[1].height").value(expectedProject.getFloors().get(1).getHeight()))
                    .andExpect(jsonPath("$.floors[1].planningImage.id").value(expectedProject.getFloors().get(1).getPlanningImage().getId()))
                    .andExpect(jsonPath("$.floors[1].planningImage.type").value(expectedProject.getFloors().get(1).getPlanningImage().getType()))
                    .andExpect(jsonPath("$.floors[1].planningImage.path").value(expectedProject.getFloors().get(1).getPlanningImage().getPath()));

            int expectedProjectsSizeAfterCreating = 1;
            int actualProjectsSizeAfterCreating = projectRepository.findAll().size();
            assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);
        }

        @Test
        @Sql(scripts = "classpath:sql/project/create_project_data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
        @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
        @DisplayName("Test - create new project without detached entities.")
        public void givenProjectDtoWithoutDetachedEntities_whenCreate_thenReturnNewProject() throws Exception {
            List<Project> project = projectRepository.findAll();
            int expectedProjectsSizeBeforeCreating = 0;
            int actualProjectsSizeBeforeCreating = project.size();
            // Projects count before creating
            assertEquals(expectedProjectsSizeBeforeCreating, actualProjectsSizeBeforeCreating);

            ProjectDto expectedProject = createProjectWithOutDetachedEntities();

            String projectJson = objectMapper.writeValueAsString(expectedProject);

            String responseJson = mockMvc.perform(post(PROJECT_URL.substring(0, PROJECT_URL.length() - 1))
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(projectJson))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.floors", hasSize(0)))
                    .andExpect(jsonPath("$.images", hasSize(0)))
                    .andExpect(jsonPath("$.photos", hasSize(0)))
                    .andReturn()
                    .getResponse()
                    .getContentAsString();

            ProjectDto actualProject = objectMapper.readValue(responseJson, ProjectDto.class);

            List<Project> actualProjects = projectRepository.findAll();
            int expectedProjectsSizeAfterCreating = 1;
            int actualProjectsSizeAfterCreating = actualProjects.size();
            // Projects count after creating
            assertEquals(expectedProjectsSizeAfterCreating, actualProjectsSizeAfterCreating);

            assertTrue(actualProject.getFloors().isEmpty());
            assertTrue(actualProject.getImages().isEmpty());
            assertTrue(actualProject.getPhotos().isEmpty());
        }

    private String createUrl(String sort, String sortDirection) {
        String sortBy = "?sortBy=";
        String direction = "&sortDirection=";
        String template = "%s%s%s%s%s";
        return String.format(template, PROJECT_URL.substring(0, PROJECT_URL.length() - 1), sortBy, sort, direction, sortDirection);
    }

    private String createUrl(int id) {
        String template = "%s%d";
        return String.format(template, PROJECT_URL, id);
    }

    private ProjectDto createFullProject(ImageInfo mainImage, List<ImageInfo> images, List<FloorDto> floors) {
        return ProjectDto.builder()
                .title("Білий дім")
                .descriptionRU("Тут живет Байден")
                .descriptionUA("Тут живе Байден")
                .popularity(3)
                .generalArea(768.5)
                .timeToCreate(62)
                .projectPrice(BigDecimal.valueOf(120000.0))
                .livingArea(650.0)
                .buildingArea(598.5)
                .wallMaterial(WallMaterialDto.BRICK)
                .wallThickness(BigDecimal.valueOf(0.5))
                .foundation(FoundationDto.STRIP)
                .ceiling(CeilingDto.COMBINED)
                .roof(RoofDto.BITUMEN_TILE)
                .buildingPrice(BigDecimal.valueOf(55998889.0))
                .insulation(InsulationDto.MINERAL_WOOL)
                .insulationThickness(0.3)
                .length(55.8)
                .width(64.7)
                .style(StyleDto.MODERN)
                .isGaragePresent(false)
                .bedroomCount(24)
                .mainImage(mainImage)
                .images(images)
                .floors(floors)
                .build();
    }

    private ProjectDto createProject() {
        return ProjectDto.builder()
                .title("Білий дім")
                .descriptionRU("Тут живет Байден")
                .descriptionUA("Тут живе Байден")
                .popularity(3)
                .generalArea(768.5)
                .timeToCreate(62)
                .projectPrice(BigDecimal.valueOf(120000.0))
                .livingArea(650.0)
                .buildingArea(598.5)
                .wallMaterial(WallMaterialDto.BRICK)
                .wallThickness(BigDecimal.valueOf(0.5))
                .foundation(FoundationDto.STRIP)
                .ceiling(CeilingDto.COMBINED)
                .roof(RoofDto.BITUMEN_TILE)
                .buildingPrice(BigDecimal.valueOf(55998889.0))
                .insulation(InsulationDto.MINERAL_WOOL)
                .insulationThickness(0.3)
                .length(55.8)
                .width(64.7)
                .style(StyleDto.MODERN)
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
                .descriptionRU("Тут живет Байден")
                .descriptionUA("Тут живе Байден")
                .popularity(3)
                .generalArea(768.5)
                .timeToCreate(62)
                .projectPrice(BigDecimal.valueOf(120000.0))
                .livingArea(650.0)
                .buildingArea(598.5)
                .wallMaterial(WallMaterialDto.BRICK)
                .wallThickness(BigDecimal.valueOf(0.5))
                .foundation(FoundationDto.STRIP)
                .ceiling(CeilingDto.COMBINED)
                .roof(RoofDto.BITUMEN_TILE)
                .buildingPrice(BigDecimal.valueOf(55998889.0))
                .insulation(InsulationDto.MINERAL_WOOL)
                .insulationThickness(0.3)
                .length(55.8)
                .width(64.7)
                .style(StyleDto.MODERN)
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
                        .id(8)
                        .type("image")
                        .path("http://127.0.0.1:51774/my-s3-bucket/8")
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
