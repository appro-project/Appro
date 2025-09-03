package com.appro.configuration.web.properties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@ToString
@Configuration
@ConfigurationProperties("web")
public class WebCorsProperties {

    @NestedConfigurationProperty
    private Cors cors;

    @Data
    public static class Cors {
        private final String[] allowedOrigins;
        private final String[] allowedOriginsPatterns;
        private final String[] allowedMethods;
        private final String[] allowedHeaders;
        private final String[] exposedHeaders;
    }
}
