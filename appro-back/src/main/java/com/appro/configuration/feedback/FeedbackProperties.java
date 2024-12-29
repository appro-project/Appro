package com.appro.configuration.feedback;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "feedback")
public class FeedbackProperties {
    private Email email;
    private Telegram telegram;

    public record Email(String from, String to) {}

    public record Telegram(String uri, String chatId) {}
}
