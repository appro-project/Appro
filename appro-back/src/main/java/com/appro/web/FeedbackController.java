package com.appro.web;

import com.appro.service.FeedBackService;
import com.appro.web.request.FeedbackRequest;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.mail.MessagingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FeedbackController {

    private final FeedBackService feedBackService;

    @Operation(summary = "Send feedback")
    @PostMapping("/feedback")
    public void sendFeedback(@RequestBody FeedbackRequest request) throws MessagingException {
        feedBackService.sendEmail(request);
    }
}
