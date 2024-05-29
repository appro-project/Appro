
FROM maven:3.9.6-eclipse-temurin-17-alpine as build

LABEL name="appro"

ENV RELEASE=17

WORKDIR /build
COPY appro-back appro-back
COPY client client

RUN cd /build/appro-back && mvn --batch-mode clean package -DskipTests

RUN cp /build/appro-back/target/*.jar app.jar

RUN java -Djarmode=layertools -jar app.jar extract

RUN jlink \
         --verbose \
         --add-modules $(jdeps --ignore-missing-deps -q -recursive --multi-release ${RELEASE} \
         --print-module-deps --class-path 'dependencies/BOOT-INF/lib/*':'snapshot-dependencies/BOOT-INF/lib/*' app.jar) \
         --strip-debug \
         --no-man-pages \
         --no-header-files \
         --compress=2 \
         --output jdk



FROM alpine:3.19.1

ARG BUILD_PATH=/build

ENV JAVA_HOME=/usr/java/openjdk17
ENV PATH "${JAVA_HOME}/bin:${PATH}"
ENV TZ=Europe/Kiev
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

RUN apk --no-cache add tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

WORKDIR /home/$APP

COPY --from=build $BUILD_PATH/jdk $JAVA_HOME
COPY --from=build $BUILD_PATH/spring-boot-loader/ ./
COPY --from=build $BUILD_PATH/dependencies/ ./
COPY --from=build $BUILD_PATH/snapshot-dependencies/ ./
COPY --from=build $BUILD_PATH/application/ ./

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS org.springframework.boot.loader.launch.JarLauncher"]
