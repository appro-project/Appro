package com.appro.web.handler;

import java.time.LocalDateTime;

public record ErrorResponse(int statusCode, LocalDateTime time, String message, String description){}