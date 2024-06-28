package com.appro.web.handler;

import com.appro.exception.InvalidImageTypeException;
import com.appro.exception.ProjectNotFoundException;
import com.appro.exception.TooManyItemsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@Slf4j
@RestControllerAdvice
public class ExceptionsHandler {

    private static final String TOO_MANY_ITEMS = "Cannot add more than 20 items at a time.";

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(HttpRequestMethodNotSupportedException e) {
        log.error("Method not supported error:", e);
        e.printStackTrace();
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase());
        return new ResponseEntity<>(errorResponse, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler({ IllegalArgumentException.class, IllegalStateException.class })
    public ResponseEntity<ErrorResponse> handleBadRequestExceptions(RuntimeException e) {
        log.error("Bad request exception: ", e);
        e.printStackTrace();
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.BAD_REQUEST.getReasonPhrase());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TooManyItemsException.class)
    public ResponseEntity<ErrorResponse> handleTooManyImagesException(TooManyItemsException e) {
        log.error("Too many items error: ", e);
        e.printStackTrace();
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                e.getMessage(),
                TOO_MANY_ITEMS);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProjectNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProjectNotFoundException(ProjectNotFoundException e) {
        log.error("Project not found error: ", e);
        e.printStackTrace();
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.NOT_FOUND.getReasonPhrase());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidImageTypeException.class)
    public ResponseEntity<ErrorResponse> handleProjectImageTypeException(InvalidImageTypeException e) {
        log.error("Could not recognize image type.");
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now(),
                e.getMessage(),
                HttpStatus.BAD_REQUEST.getReasonPhrase());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

}