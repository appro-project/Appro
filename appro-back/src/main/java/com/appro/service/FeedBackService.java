package com.appro.service;

import com.appro.web.request.FeedbackRequest;
import jakarta.mail.MessagingException;

public interface FeedBackService {

    void sendEmail(FeedbackRequest request) throws MessagingException;
}
