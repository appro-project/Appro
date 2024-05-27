package com.appro.web.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(NoSuchMethodException.class)
    public ErrorResponse handleIllegalArgumentException(NoSuchMethodException e) {
        return new ErrorResponse(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase());
    }

    @ExceptionHandler({ IllegalArgumentException.class, IllegalStateException.class })
    public ErrorResponse handleBadRequestExceptions(RuntimeException e) {
        return new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.BAD_REQUEST.getReasonPhrase());
    }

}
