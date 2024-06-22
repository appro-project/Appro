package com.appro.exception;

public class ImageNotFoundException extends RuntimeException {

    private static final String MESSAGE = "Can not find Image by id: %d";

    public ImageNotFoundException(int id) {
        super(String.format(MESSAGE, id));
    }
}
