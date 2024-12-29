package com.appro.web.request;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public record FeedbackRequest(String name,
                              String phone,
                              String email,
                              String content,
                              String project,
                              @JsonFormat(pattern = "dd/MM/yyyy")
                              LocalDate date,
                              LocalTime time,
                              Boolean anyTime) {
}
