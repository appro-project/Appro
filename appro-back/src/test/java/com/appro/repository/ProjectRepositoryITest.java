package com.appro.repository;

import com.appro.AbstractBaseJpaITest;
import com.appro.entity.Floor;
import com.appro.entity.Image;
import com.appro.entity.Project;
import org.junit.jupiter.api.*;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:project-test-db"
})
class ProjectRepositoryITest extends AbstractBaseJpaITest {
    private static final int PROJECT_ID = 1;
    private static final int SECOND_ID = 2;
    private static final int THIRD_ID = 3;

    @BeforeEach
    void setUp() {
        Project project = createProject();
        projectRepository.save(project);
    }

    @AfterEach
    void tearDown() {
        projectRepository.deleteAll();
    }

    @Test
    @Order(1)
    @DisplayName("Test (repo) - find by id, check attributes.")
    void givenProject_whenFindById_thenReturnProjectCheckAttributes() {
        // given
        Project expectedProject = createProject();

        // when
        Optional<Project> project = projectRepository.findById(PROJECT_ID);
        Project actualProject = null;
        if (project.isPresent()) {
            actualProject = project.get();
        }

        // then
        Assertions.assertNotNull(actualProject);

        Assertions.assertEquals(PROJECT_ID, actualProject.getId());
        Assertions.assertEquals(expectedProject.getTitle(), actualProject.getTitle());
        Assertions.assertEquals(expectedProject.getDescriptionRU(), actualProject.getDescriptionRU());
        Assertions.assertEquals(expectedProject.getDescriptionUA(), actualProject.getDescriptionUA());
        Assertions.assertEquals(expectedProject.getPopularity(), actualProject.getPopularity());
        Assertions.assertEquals(expectedProject.getGeneralArea(), actualProject.getGeneralArea());
        Assertions.assertEquals(expectedProject.getTimeToCreate(), actualProject.getTimeToCreate());
        Assertions.assertEquals(expectedProject.getProjectPrice(), actualProject.getProjectPrice());
        Assertions.assertEquals(expectedProject.getLivingArea(), actualProject.getLivingArea());
        Assertions.assertEquals(expectedProject.getBuildingArea(), actualProject.getBuildingArea());
        Assertions.assertEquals(expectedProject.getWallMaterial(), actualProject.getWallMaterial());
        Assertions.assertEquals(expectedProject.getWallThickness(), actualProject.getWallThickness());
        Assertions.assertEquals(expectedProject.getFoundation(), actualProject.getFoundation());
        Assertions.assertEquals(expectedProject.getCeiling(), actualProject.getCeiling());
        Assertions.assertEquals(expectedProject.getRoof(), actualProject.getRoof());
        Assertions.assertEquals(expectedProject.getBuildingPrice(), actualProject.getBuildingPrice());
        Assertions.assertEquals(expectedProject.getInsulation(), actualProject.getInsulation());
        Assertions.assertEquals(expectedProject.getInsulationThickness(), actualProject.getInsulationThickness());
        Assertions.assertEquals(expectedProject.getLength(), actualProject.getLength());
        Assertions.assertEquals(expectedProject.getWidth(), actualProject.getWidth());
        Assertions.assertEquals(expectedProject.getStyle(), actualProject.getStyle());
        Assertions.assertEquals(expectedProject.getIsGaragePresent(), actualProject.getIsGaragePresent());
        Assertions.assertEquals(expectedProject.getBedroomCount(), actualProject.getBedroomCount());
    }

    @Test
    @Order(2)
    @DisplayName("Test (repo) - find by id, check images.")
    void givenProject_whenFindById_thenReturnProjectCheckImages() {
        // given
        Project expectedProject = createProject();
        List<Image> expectedImages = expectedProject.getImages();
        int expectedImagesSize = expectedImages.size();
        Image firstExpectedImage = expectedImages.get(0);
        Image secondExpectedImage = expectedImages.get(1);

        // when
        Optional<Project> project = projectRepository.findById(SECOND_ID);
        Project actualProject = null;
        if (project.isPresent()) {
            actualProject = project.get();
        }

        assert actualProject != null;
        List<Image> actualProjectImages = actualProject.getImages();
        int actualImagesSize = expectedImages.size();
        Image firstActualImage = actualProjectImages.get(0);
        Image secondActualImage = actualProjectImages.get(1);

        // then
        Assertions.assertNotNull(actualProject);
        Assertions.assertEquals(SECOND_ID, actualProject.getId());
        Assertions.assertEquals(expectedImagesSize, actualImagesSize);

        Assertions.assertEquals(firstExpectedImage.getType(), firstActualImage.getType());
        Assertions.assertEquals(secondExpectedImage.getType(), secondActualImage.getType());

        Assertions.assertEquals(firstExpectedImage.getPath(), firstActualImage.getPath());
        Assertions.assertEquals(secondExpectedImage.getPath(), secondActualImage.getPath());
    }

    @Test
    @Order(3)
    @DisplayName("Test (repo) - find by id, check floors.")
    void givenProject_whenFindById_thenReturnProjectCheckFloors() {
        // given
        Project expectedProject = createProject();
        List<Floor> expectedFloorsList = expectedProject.getFloors();
        int expectedFloorsSize = expectedFloorsList.size();
        Floor expectedFirstFloor = expectedFloorsList.get(0);
        Floor expectedSecondFloor = expectedFloorsList.get(1);
        Image expectedFirstFloorImage = expectedFirstFloor.getPlanningImage();
        Image expectedSecondImage = expectedSecondFloor.getPlanningImage();

        // when
        Optional<Project> project = projectRepository.findById(THIRD_ID);
        Project actualProject = null;
        if (project.isPresent()) {
            actualProject = project.get();
        }

        assert actualProject != null;
        List<Floor> actualFloorsList = actualProject.getFloors();
        int actualFloorsSize = actualFloorsList.size();
        Floor actualFirstFloor = actualFloorsList.get(0);
        Floor actualSecondFloor = actualFloorsList.get(1);

        // then
        Assertions.assertNotNull(actualProject);
        Assertions.assertEquals(THIRD_ID, actualProject.getId());
        Assertions.assertEquals(expectedFloorsSize, actualFloorsSize);

        Assertions.assertEquals(expectedFirstFloor.getIndex(), actualFirstFloor.getIndex());
        Assertions.assertEquals(expectedFirstFloor.getArea(), actualFirstFloor.getArea());
        Assertions.assertEquals(expectedFirstFloor.getIsAttic(), actualFirstFloor.getIsAttic());
        Assertions.assertEquals(expectedFirstFloor.getIsBasement(), actualFirstFloor.getIsBasement());

        Image firstFlorImage = actualFirstFloor.getPlanningImage();
        Assertions.assertEquals(expectedFirstFloorImage.getPath(), firstFlorImage.getPath());
        Assertions.assertEquals(expectedFirstFloorImage.getType(), firstFlorImage.getType());

        Assertions.assertEquals(expectedSecondFloor.getIndex(), actualSecondFloor.getIndex());
        Assertions.assertEquals(expectedSecondFloor.getArea(), actualSecondFloor.getArea());
        Assertions.assertEquals(expectedSecondFloor.getIsAttic(), actualSecondFloor.getIsAttic());
        Assertions.assertEquals(expectedSecondFloor.getIsBasement(), actualSecondFloor.getIsBasement());

        Image secondFlorImage = actualSecondFloor.getPlanningImage();
        Assertions.assertEquals(expectedSecondImage.getPath(), secondFlorImage.getPath());
        Assertions.assertEquals(expectedSecondImage.getType(), secondFlorImage.getType());
    }

    private Project createProject() {
        return Project.builder()
                .title("Білий дім")
                .descriptionRU("Тут живет Байден")
                .descriptionUA("Тут живе Байден")
                .popularity(3)
                .generalArea(768.5)
                .timeToCreate(62)
                .projectPrice(BigDecimal.valueOf(120000.0))
                .livingArea(650.0)
                .buildingArea(598.5)
                .wallMaterial("bric")
                .wallThickness(BigDecimal.valueOf(0.5))
                .foundation("strip")
                .ceiling("combined")
                .roof("bitumen_tile")
                .buildingPrice(BigDecimal.valueOf(55998889.0))
                .insulation("mineral_wool")
                .insulationThickness(0.3)
                .length(55.8)
                .width(64.7)
                .style("modern")
                .isGaragePresent(false)
                .bedroomCount(24)
                .images(createImages())
                .floors(createFloors())
                .build();
    }

    private List<Image> createImages() {
        return List.of(
                Image.builder()
                        .type("main")
                        .path("http://127.0.0.1:51774/my-s3-bucket/1")
                        .build(),
                Image.builder()
                        .type("image")
                        .path("http://127.0.0.1:51774/my-s3-bucket/2")
                        .build());
    }

    private Image firstFloorImage() {
        return Image.builder()
                .path("http://127.0.0.1:51774/my-s3-bucket/3")
                .type("image")
                .build();
    }

    private Image secondFloorImage() {
        return Image.builder()
                .path("http://127.0.0.1:51774/my-s3-bucket/4")
                .type("photo")
                .build();
    }

    private List<Floor> createFloors() {
        return List.of(
                Floor.builder()
                        .index(0)
                        .area(84.5)
                        .isAttic(false)
                        .isBasement(true)
                        .height(2.8)
                        .planningImage(firstFloorImage())
                        .build(),
                Floor.builder()
                        .index(1)
                        .area(298.2)
                        .isAttic(true)
                        .isBasement(false)
                        .height(223.5)
                        .planningImage(secondFloorImage())
                        .build());
    }
}