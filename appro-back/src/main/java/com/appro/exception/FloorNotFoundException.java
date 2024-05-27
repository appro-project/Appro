package com.appro.exception;

public class FloorNotFoundException extends RuntimeException {

    private static final String MESSAGE = "Floor with id: %s does not exist";

    public FloorNotFoundException(int id) {
        super(String.format(MESSAGE, id));
    }
}
