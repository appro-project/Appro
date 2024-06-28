//package com.appro;
//
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.AfterAll;
//import org.testcontainers.containers.localstack.LocalStackContainer;
//import org.testcontainers.utility.DockerImageName;
//
//import java.util.UUID;
//
//public abstract class AbstractLocalStackTest {
//
//    protected static LocalStackContainer container;
//    protected static String BUCKET_NAME;
//    protected static String QUEUE_NAME;
//
//    @BeforeAll
//    public static void setup() {
//        try {
//            container = new LocalStackContainer(
//                    DockerImageName.parse("localstack/localstack:3.0")
//            );
//            container.start();
//
//            BUCKET_NAME = UUID.randomUUID().toString();
//            QUEUE_NAME = UUID.randomUUID().toString();
//
//            container.execInContainer("awslocal", "s3", "mb", "s3://" + BUCKET_NAME);
//            container.execInContainer(
//                    "awslocal",
//                    "sqs",
//                    "create-queue",
//                    "--queue-name",
//                    QUEUE_NAME
//            );
//
//            System.setProperty("app.bucket", BUCKET_NAME);
//            System.setProperty("app.queue", QUEUE_NAME);
//            System.setProperty(
//                    "aws.region",
//                    container.getRegion()
//            );
//            System.setProperty(
//                    "spring.cloud.aws.credentials.access-key",
//                    container.getAccessKey()
//            );
//            System.setProperty(
//                    "spring.cloud.aws.credentials.secret-key",
//                    container.getSecretKey()
//            );
//            System.setProperty(
//                    "spring.cloud.aws.endpoint",
//                    container.getEndpoint().toString()
//            );
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @AfterAll
//    public static void tearDown() {
//        if (container != null) {
//            container.stop();
//        }
//    }
//}
//
