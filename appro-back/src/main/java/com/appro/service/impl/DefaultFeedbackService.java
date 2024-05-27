package com.appro.service.impl;

import com.appro.service.FeedBackService;
import com.appro.web.request.FeedbackRequest;
import jakarta.mail.Session;
import jakarta.mail.Message;
import jakarta.mail.Transport;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DefaultFeedbackService implements FeedBackService {

    private static final String MESSAGE_FORMAT = "Ім'я: %s;%nТелефон: %s;%nEmail: %s;%nПовідомлення: %s;";
    private static final String DASH = "-";
    private static final String NOTIFICATION = "Оповещение от Appro";

    @Value("${feedback.email.from}")
    private String emailFrom;

    @Value("${feedback.email.to}")
    private String emailTo;

    private final Session session;

    @Override
    public void sendEmail(FeedbackRequest request) throws MessagingException {
        String content = parseFeedbackMessageRequest(request);
        MimeMessage message = createMimeMessage(content);

        Transport.send(message);
    }

    private MimeMessage createMimeMessage(String text) throws MessagingException {
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(emailFrom));
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(emailTo));
        message.setSubject(NOTIFICATION);
        message.setText(text);
        return message;
    }

    private String parseFeedbackMessageRequest(FeedbackRequest request) {
        return String.format(MESSAGE_FORMAT,
                request.name() != null ? request.name() : DASH,
                request.phone() != null ? request.phone() : DASH,
                request.email() != null ? request.email() : DASH,
                request.feedback() != null ? request.feedback() : DASH);
    }
}
