package com.appro.exception;

public class InvalidImageTypeException extends RuntimeException {

    private static final String MESSAGE = "Could not recognized image type: %s";

    public InvalidImageTypeException(String message) {
        super(String.format(MESSAGE, message));
    }
}
