package com.appro.service.impl;

import com.appro.configuration.feedback.FeedbackProperties;
import com.appro.service.FeedBackService;
import com.appro.service.util.FeedbackFormatter;
import com.appro.web.request.FeedbackRequest;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.mail.Session;
import jakarta.mail.Message;
import jakarta.mail.Transport;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class DefaultFeedbackService implements FeedBackService {

    private static final String NOTIFICATION = "Оповещение от Appro";

    private final Session session;
    private final RestTemplate restTemplate;
    private final FeedbackProperties properties;

    @Override
    public void sendEmail(FeedbackRequest request) throws MessagingException {
        String content = FeedbackFormatter.format(request);
        MimeMessage message = createMimeMessage(content);

        Transport.send(message);
    }

    @Override
    public void sendTelegramNotification(FeedbackRequest request) {
        FeedbackProperties.Telegram telegram = properties.getTelegram();
        restTemplate.postForObject(telegram.uri(), new TelegramRequest(telegram.chatId(),
                FeedbackFormatter.format(request)), String.class);
    }

    private MimeMessage createMimeMessage(String text) throws MessagingException {
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(properties.getEmail().from()));
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(properties.getEmail().to()));
        message.setSubject(NOTIFICATION);
        message.setText(text);
        return message;
    }

    private record TelegramRequest(@JsonProperty("chat_id") String chatId, String text) {}
}
