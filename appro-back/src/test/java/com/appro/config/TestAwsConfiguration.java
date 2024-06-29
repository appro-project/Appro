package com.appro.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.testcontainers.containers.localstack.LocalStackContainer;
import software.amazon.awssdk.regions.Region;

import static com.appro.AbstractAmazonS3ITest.localStackContainer;

@TestConfiguration
public class TestAwsConfiguration {


    @Bean
    public AmazonS3 amazonS3() {
        Region REGION = Region.EU_NORTH_1;

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(
                localStackContainer.getAccessKey(), localStackContainer.getSecretKey());

        return AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(localStackContainer.getEndpointOverride(LocalStackContainer.Service.S3).toString(),
                        REGION.id()))
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withPathStyleAccessEnabled(true) // provides access to buckets via URL in the format http://s3.amazonaws.com/bucket-name
                .build();
    }
}
