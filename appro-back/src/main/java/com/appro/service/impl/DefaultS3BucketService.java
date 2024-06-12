package com.appro.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.appro.configuration.aws.AwsConfiguration;
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
    public String upload(MultipartFile file) {
        File localFile = convertMultipartFileToFile(file);

        amazonS3.putObject(new PutObjectRequest(awsClientConfig.getBucketName(), file.getOriginalFilename(), localFile));

        return getPublicUrl(file.getOriginalFilename());
    }

    private String getPublicUrl(String fileName) {
        return amazonS3.getUrl(awsClientConfig.getBucketName(), fileName).toString();
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
