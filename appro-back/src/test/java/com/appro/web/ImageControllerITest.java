package com.appro.web;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.appro.AbstractAmazonS3ITest;
import com.appro.dto.ImageInfo;
import com.appro.service.impl.DefaultImageService;
import com.appro.web.handler.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import nl.altindag.log.LogCaptor;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Slf4j
class ImageControllerITest extends AbstractAmazonS3ITest {

    private static final String FIRST_FILE_PATH = "static/images/test-image-1.jpeg";
    private static final String SECOND_FILE_PATH = "static/images/test-image-2.jpeg";

    private static final int FIRST_IMAGE_ID = 1;
    private static final int SECOND_IMAGE_ID = 2;

    private static final String IMAGE_URL = "/api/v1/images";

    private static final String IMAGE_TYPE = "image";
    private static final String PHOTO_TYPE = "photo";

    private static final String S3_BUCKET_HOST = localStackContainer.getEndpoint().toString();
    private static final String S3_BUCKET_NAME = localStackContainer.getContainerName();

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private AmazonS3 amazonS3;

    private LogCaptor logCaptor;

    @BeforeEach
    void setUp() {
        logCaptor = LogCaptor.forClass(DefaultImageService.class);
    }

    @AfterEach
    void cleanupS3() {
        ObjectListing objectListing = amazonS3.listObjects(BUCKET_NAME);
        log.info("S3 local bucket objects count before cleanup: {}", objectListing.getObjectSummaries().size());

        for (S3ObjectSummary objectSummary : objectListing.getObjectSummaries()) {
            log.info("Deleting object with id: {}", objectSummary.getKey());
            amazonS3.deleteObject(BUCKET_NAME, objectSummary.getKey());
        }

        objectListing = amazonS3.listObjects(BUCKET_NAME);
        log.info("S3 local bucket objects count after cleanup: {}", objectListing.getObjectSummaries().size());
    }

    @AfterAll
    static void cleanupFiles() {
        try {
            Files.deleteIfExists(Paths.get("test-image-1.jpeg"));
            Files.deleteIfExists(Paths.get("test-image-2.jpeg"));
            log.info("Test files deleted successfully.");
        } catch (IOException e) {
            log.error("Failed to delete test files.", e);
        }
    }

    @Test
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - upload images.")
    public void givenListOfImages_whenUpload_thenStoreInDBAndS3() {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = createUploadRequestBy(IMAGE_TYPE);

        ResponseEntity<List<ImageInfo>> response = restTemplate.exchange(
                IMAGE_URL,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<>() {}
        );

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ImageInfo> images = response.getBody();

        Assertions.assertEquals(FIRST_IMAGE_ID, images.get(0).getId());
        Assertions.assertEquals(createUrl(FIRST_IMAGE_ID), images.get(0).getPath());
        Assertions.assertEquals(IMAGE_TYPE, images.get(0).getType());

        Assertions.assertEquals(SECOND_IMAGE_ID, images.get(1).getId());
        Assertions.assertEquals(createUrl(SECOND_IMAGE_ID), images.get(1).getPath());
        Assertions.assertEquals(IMAGE_TYPE, images.get(1).getType());

        assertTrue(logCaptor.getInfoLogs().contains("Successfully saved 2 images."));
    }

    @Test
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - upload photos.")
    public void givenListOfPhotos_whenUpload_thenStoreInDBAndS3() {
        HttpEntity<MultiValueMap<String, Object>> requestEntity = createUploadRequestBy(PHOTO_TYPE);

        ResponseEntity<List<ImageInfo>> response = restTemplate.exchange(
                IMAGE_URL,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<>() {}
        );

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertFalse(response.getBody().isEmpty());

        List<ImageInfo> images = response.getBody();

        Assertions.assertEquals(FIRST_IMAGE_ID, images.get(0).getId());
        Assertions.assertEquals(createUrl(FIRST_IMAGE_ID), images.get(0).getPath());
        Assertions.assertEquals(PHOTO_TYPE, images.get(0).getType());

        Assertions.assertEquals(SECOND_IMAGE_ID, images.get(1).getId());
        Assertions.assertEquals(createUrl(SECOND_IMAGE_ID), images.get(1).getPath());
        Assertions.assertEquals(PHOTO_TYPE, images.get(1).getType());

        assertTrue(logCaptor.getInfoLogs().contains("Successfully saved 2 images."));
    }

    @Test
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - upload images with incorrect image type.")
    public void givenIncorrectImageType_whenUpload_thenReturnBadRequest() {
        String invalidType = "not an image";
        String expectedErrorMessage = "Could not recognized image type: not an image";

        HttpEntity<MultiValueMap<String, Object>> requestEntity = createUploadRequestBy(invalidType);

        ResponseEntity<ErrorResponse> response = restTemplate.exchange(
                IMAGE_URL,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<>() {}
        );

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ErrorResponse errorResponse = response.getBody();
        Assertions.assertEquals(expectedErrorMessage, errorResponse.message());
        Assertions.assertEquals(HttpStatus.BAD_REQUEST.value(), errorResponse.statusCode());
    }

    @Test
    @Sql(scripts = "classpath:sql/truncate_all.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    @DisplayName("Test - upload more than 20 images.")
    public void givenListOfImages_whenUpload_thenReturnBadRequest() {
        String expectedErrorMessage = "There are too many images: 21, array max size is 20.";

        HttpEntity<MultiValueMap<String, Object>> requestEntity = createMapWithMoreThanTwentyImages(IMAGE_TYPE);

        ResponseEntity<ErrorResponse> response = restTemplate.exchange(
                IMAGE_URL,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<>() {}
        );

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());

        ErrorResponse errorResponse = response.getBody();
        Assertions.assertEquals(expectedErrorMessage, errorResponse.message());
        Assertions.assertEquals(HttpStatus.BAD_REQUEST.value(), errorResponse.statusCode());
    }

    private String createUrl(int imageId) {
        String template = "%s%s/%d";
        return String.format(template, S3_BUCKET_HOST, S3_BUCKET_NAME, imageId);
    }

    private @NotNull HttpEntity<MultiValueMap<String, Object>> createUploadRequestBy(String type) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        File firstImage = new File(Objects.requireNonNull(getClass().getClassLoader().getResource(FIRST_FILE_PATH)).getFile());
        File secondImage = new File(Objects.requireNonNull(getClass().getClassLoader().getResource(SECOND_FILE_PATH)).getFile());

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("images", new FileSystemResource(firstImage)); // FileSystemResource needs for correct deserialization
        body.add("images", new FileSystemResource(secondImage));
        body.add("type", type);

        return new HttpEntity<>(body, headers);
    }

    private @NotNull HttpEntity<MultiValueMap<String, Object>> createMapWithMoreThanTwentyImages(String type) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        File image = new File(Objects.requireNonNull(getClass().getClassLoader().getResource(FIRST_FILE_PATH)).getFile());

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("images", new FileSystemResource(image)); // FileSystemResource needs for correct deserialization
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("images", new FileSystemResource(image));
        body.add("type", type);

        return new HttpEntity<>(body, headers);
    }

}