package com.appro.web.request;

public record FeedbackRequest(String name,
                              String phone,
                              String email,
                              String content,
                              String project) {
}
