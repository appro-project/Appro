package com.appro;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.utility.DockerImageName;
import software.amazon.awssdk.regions.Region;

import java.util.UUID;

public abstract class AbstractAmazonS3ITest extends AbstractBaseITest {

    public static final LocalStackContainer localStackContainer;

    public static final String BUCKET_NAME = "my-s3-bucket";
    private static String QUEUE_NAME; // ?
    private static final Region REGION = Region.EU_NORTH_1;


    static {
        localStackContainer = new LocalStackContainer(
                DockerImageName.parse("localstack/localstack:latest"))
                .withEnv("DEFAULT_REGION", REGION.id())
                .withServices(LocalStackContainer.Service.S3, LocalStackContainer.Service.SQS)
                .withCreateContainerCmdModifier(cmd -> cmd.withName(BUCKET_NAME));
        localStackContainer.start();

        setupLocalStack();
    }

    private static void setupLocalStack() {
        try {
            QUEUE_NAME = UUID.randomUUID().toString();

            localStackContainer.execInContainer("awslocal", "s3", "mb", "s3://" + BUCKET_NAME);
            localStackContainer.execInContainer(
                    "awslocal",
                    "sqs",
                    "create-queue",
                    "--queue-name",
                    QUEUE_NAME
            );

            System.setProperty("app.queue", QUEUE_NAME);
            System.setProperty("aws.region.eu", REGION.id()
            );

            System.setProperty(
                    "aws.access.key",
                    localStackContainer.getAccessKey()
            );

            System.setProperty(
                    "aws.access.secret-key",
                    localStackContainer.getSecretKey()
            );

            System.setProperty(
                    "aws.endpoint.url",
                    localStackContainer.getEndpoint().toString()
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DynamicPropertySource
    public static void overrideProps(DynamicPropertyRegistry registry) {
        registry.add("aws.bucket.name", () -> BUCKET_NAME);
        registry.add("aws.queue.name", () -> QUEUE_NAME);
        registry.add("aws.region", REGION::id);
        registry.add("spring.datasource.url", () -> localStackContainer.getEndpointOverride(LocalStackContainer.Service.S3).toString());
    }
}
