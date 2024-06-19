package com.appro.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.appro.configuration.aws.AwsConfiguration;
import com.appro.entity.Image;
import com.appro.service.S3BucketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Objects;


@Slf4j
@Service
@RequiredArgsConstructor
public class DefaultS3BucketService implements S3BucketService {

    private final AmazonS3 amazonS3;
    private final AwsConfiguration awsClientConfig;

    @Override
    public String upload(MultipartFile file, Image image) {
        File localFile = convertMultipartFileToFile(file);

        String imageKey = String.valueOf(image.getId());
        amazonS3.putObject(new PutObjectRequest(awsClientConfig.getBucketName(), imageKey, localFile));
        return getPublicUrl(imageKey);
    }

    @Override
    public void delete(Image image) {
        amazonS3.deleteObject(awsClientConfig.getBucketName(), String.valueOf(image.getId()));
    }

    private String getPublicUrl(String imageKey) {
        return amazonS3.getUrl(awsClientConfig.getBucketName(), imageKey).toString();
    }


    private File convertMultipartFileToFile(MultipartFile file) {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            Files.copy(file.getInputStream(), convertedFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return convertedFile;
    }


}
