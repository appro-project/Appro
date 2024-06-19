package com.appro.web.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ExceptionsHandler {

    private static final String TOO_MANY_ITEMS = "Cannot add more than 20 items at a time.";

    @ExceptionHandler(NoSuchMethodException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(NoSuchMethodException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase());
        return new ResponseEntity<>(errorResponse, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler({ IllegalArgumentException.class, IllegalStateException.class })
    public ResponseEntity<ErrorResponse> handleBadRequestExceptions(RuntimeException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.BAD_REQUEST.getReasonPhrase());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TooManyItemsException.class)
    public ResponseEntity<ErrorResponse> handleTooManyImagesException(TooManyItemsException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                e.getMessage(),
                TOO_MANY_ITEMS);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}