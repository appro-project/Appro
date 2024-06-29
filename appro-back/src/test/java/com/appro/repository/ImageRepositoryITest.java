package com.appro.repository;

import com.appro.AbstractBaseJpaITest;
import com.appro.entity.Image;
import com.appro.entity.Project;
import com.appro.entity.project_options.*;
import org.junit.jupiter.api.*;
import org.springframework.test.context.TestPropertySource;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:image-test-db"
})
class ImageRepositoryITest extends AbstractBaseJpaITest {

    private static final int PROJECT_ID = 1;
    private static final int IMAGE_ID = 1;

    @BeforeEach
    void setUp() {
        Project project = projectRepository.save(createProject());
        Image image = project.getImages().stream()
                .filter(i -> i.getType().equals("main"))
                .findAny()
                .orElse(null);
        assert image != null;
        image.setProject(project);
    }

    @AfterEach
    void tearDown() {
        imageRepository.deleteAll();
        projectRepository.deleteAll();
    }


    @Test
    @Order(1)
    @DisplayName("Test (repo) - find main image by project id.")
    void givenImage_whenFindMainImage_thenReturnMainImage() {
        // given
        Image expectedImage = createImage();

        // when
        Optional<Image> image = imageRepository.findMainImageByProjectId(PROJECT_ID);
        Image actualImage = null;
        if (image.isPresent()) {
            actualImage = image.get();
        }

        // then
        Assertions.assertNotNull(actualImage);
        Assertions.assertEquals(IMAGE_ID, actualImage.getId());
        Assertions.assertEquals(expectedImage.getType(), actualImage.getType());
        Assertions.assertEquals(expectedImage.getPath(), actualImage.getPath());
    }

    @Test
    @Order(2)
    @DisplayName("Test (repo) - find main image, return optional empty.")
    void givenNotExistingProjectId_whenFindMainImage_thenReturnOptionalEmpty() {
        int notExistingProjectId = 100;

        Optional<Image> image = imageRepository.findMainImageByProjectId(notExistingProjectId);

        Assertions.assertFalse(image.isPresent());
    }

    private Project createProject() {
        return Project.builder()
                .title("Білий дім")
                .description("Тут живе Байден")
                .popularity(3)
                .generalArea(768.5)
                .timeToCreate(62)
                .projectPrice(BigDecimal.valueOf(120000.0))
                .livingArea(650.0)
                .buildingArea(598.5)
                .wallMaterial(WallMaterialOptions.fromValue("кирпич"))
                .wallThickness(BigDecimal.valueOf(0.5))
                .foundation(FoundationOptions.fromValue("ленточный"))
                .ceiling(CeilingOptions.fromValue("комбинированная"))
                .roof(RoofOptions.fromValue("битумная черепица"))
                .buildingPrice(BigDecimal.valueOf(55998889.0))
                .insulation(InsulationOptions.fromValue("минеральная вата"))
                .insulationThickness(0.3)
                .length(55.8)
                .width(64.7)
                .style(StyleOptions.fromValue("современный"))
                .isGaragePresent(false)
                .bedroomCount(24)
                .images(List.of(createImage()))
                .floors(List.of())
                .build();
    }

    private Image createImage() {
        return Image.builder()
                        .type("main")
                        .path("http://127.0.0.1:51774/my-s3-bucket/1")
                        .build();
    }
}