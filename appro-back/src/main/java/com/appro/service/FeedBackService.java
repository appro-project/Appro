package com.appro.service;

import com.appro.web.request.FeedbackRequest;
import jakarta.mail.MessagingException;
import org.springframework.context.annotation.Profile;

public interface FeedBackService {

    void sendEmail(FeedbackRequest request) throws MessagingException;
}
