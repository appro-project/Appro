package com.appro.configuration.feedback;

import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.Properties;

@Configuration
public class FeedbackConfiguration {

    @Value("${feedback.email.from}")
    private String emailFrom;

    @Value("${feedback.email.api-key}")
    private String apiKey;

    @Bean
    public Properties mailProperties() {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.port", "587");
        return props;
    }

    @Bean
    public Session mailSession(Properties mailProperties) {
        return Session.getInstance(mailProperties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(emailFrom, apiKey);
            }
        });
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
