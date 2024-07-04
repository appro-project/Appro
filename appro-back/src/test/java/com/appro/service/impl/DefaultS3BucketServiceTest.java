package com.appro.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.appro.configuration.aws.AwsConfiguration;
import com.appro.entity.Image;
import com.appro.exception.S3OperationException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.doThrow;

@Slf4j
@ExtendWith(MockitoExtension.class)
class DefaultS3BucketServiceTest {

    private static final String FILE_NAME = "test-file.txt";
    private static final String BUCKET_NAME = "my-s3-bucket";
    private static final String IMAGE_KEY = "1";
    private static final String URL = "http://127.0.0.1:51774/my-s3-bucket/1";

    @Mock
    private AmazonS3 amazonS3;
    @Mock
    private AwsConfiguration awsClientConfig;
    @InjectMocks
    DefaultS3BucketService s3BucketService;

    @AfterAll
    static void cleanupFiles() {
        try {
            Files.deleteIfExists(Paths.get(FILE_NAME));
            log.info("Test files deleted successfully.");
        } catch (IOException e) {
            log.error("Failed to delete test files.", e);
        }
    }


    @Test
    void givenFile_whenUpload_thenUploadSuccessful() throws Exception {
        // given
        MultipartFile multipartFile = mock(MultipartFile.class);
        Image image = new Image();
        image.setId(1);

        given(multipartFile.getOriginalFilename()).willReturn(FILE_NAME);
        given(multipartFile.getInputStream()).willReturn(mock(InputStream.class));
        given(awsClientConfig.getBucketName()).willReturn(BUCKET_NAME);
        given(amazonS3.getUrl(BUCKET_NAME, IMAGE_KEY)).willReturn(new URL(URL));

        // when
        String actualUrl = s3BucketService.upload(multipartFile, image);

        // then
        assertEquals(URL, actualUrl);
        verify(amazonS3).putObject(any(PutObjectRequest.class));
    }

    @Test
    void givenFile_whenUpload_thenThrowS3OperationException() throws Exception {
        // given
        MultipartFile multipartFile = mock(MultipartFile.class);
        Image image = new Image();
        image.setId(1);

        given(multipartFile.getOriginalFilename()).willReturn(FILE_NAME);
        given(multipartFile.getInputStream()).willReturn(mock(InputStream.class));
        given(awsClientConfig.getBucketName()).willReturn(BUCKET_NAME);
        doThrow(new RuntimeException()).when(amazonS3).putObject(any(PutObjectRequest.class));

        // then
        S3OperationException exception = assertThrows(S3OperationException.class, () -> {
            s3BucketService.upload(multipartFile, image);
        });
        assertEquals("Failed upload image to S3", exception.getMessage());
        verify(amazonS3).putObject(any(PutObjectRequest.class));
    }

    @Test
    void givenImage_whenDelete_thenDeleteSuccessful() {
        // given
        Image image = new Image();
        image.setId(1);

        given(awsClientConfig.getBucketName()).willReturn(BUCKET_NAME);

        // when
        s3BucketService.delete(image);

        // then
        verify(amazonS3).deleteObject(BUCKET_NAME, IMAGE_KEY);
    }

    @Test
    void givenImage_whenDelete_thenThrowS3OperationException() {
        // given
        Image image = new Image();
        image.setId(1);

        given(awsClientConfig.getBucketName()).willReturn(BUCKET_NAME);
        doThrow(new RuntimeException()).when(amazonS3).deleteObject(BUCKET_NAME, IMAGE_KEY);

        // when
        S3OperationException exception = assertThrows(S3OperationException.class, () -> {
            s3BucketService.delete(image);
        });

        // then
        assertEquals("Failed to delete image from S3", exception.getMessage());
        verify(amazonS3).deleteObject(BUCKET_NAME, IMAGE_KEY);
    }

    @Test
    void givenImageKey_whenGetPublicUrl_thenReturnUrl() throws MalformedURLException {
        // given
        URL expectedUrl = new URL(URL);

        given(awsClientConfig.getBucketName()).willReturn(BUCKET_NAME);
        given(amazonS3.getUrl(awsClientConfig.getBucketName(), IMAGE_KEY)).willReturn(expectedUrl);

        // when
        String actualUrlString = s3BucketService.getPublicUrl(IMAGE_KEY);

        // then
        assertEquals(URL, actualUrlString);
    }

    @Test
    void givenMultipartFile_whenConvertMultipartFileToFile_thenReturnFile() throws IOException {
        // given
        MultipartFile multipartFile = mock(MultipartFile.class);
        File expectedFile = new File(FILE_NAME);

        given(multipartFile.getOriginalFilename()).willReturn(FILE_NAME);
        given(multipartFile.getInputStream()).willReturn(Mockito.mock(InputStream.class));

        // when
        File resultFile = s3BucketService.convertMultipartFileToFile(multipartFile);

        // then
        assertNotNull(resultFile);
        assertEquals(expectedFile.getName(), resultFile.getName());
    }

    @Test
    void givenNullMultipartFileName_whenConvertMultipartFileToFile_thenThrowS3OperationException() {
        // given
        String expectedExceptionMessage = "Can not convert multipart file cause file name is null.";
        MultipartFile multipartFile = mock(MultipartFile.class);
        given(multipartFile.getOriginalFilename()).willReturn(null);

        // then
        S3OperationException exception = assertThrows(S3OperationException.class, () -> {
            s3BucketService.convertMultipartFileToFile(multipartFile);
        });
        assertEquals(expectedExceptionMessage, exception.getMessage());
    }

    @Test
    void givenMultipartFile_whenConvertMultipartFileToFile_thenThrowS3OperationException() throws Exception {
        // given
        MultipartFile multipartFile = mock(MultipartFile.class);
        given(multipartFile.getOriginalFilename()).willReturn(FILE_NAME);
        given(multipartFile.getInputStream()).willThrow(new RuntimeException());

        // then
        S3OperationException exception = assertThrows(S3OperationException.class, () -> {
            s3BucketService.convertMultipartFileToFile(multipartFile);
        });
        assertEquals("Error converting file for upload", exception.getMessage());
    }
}