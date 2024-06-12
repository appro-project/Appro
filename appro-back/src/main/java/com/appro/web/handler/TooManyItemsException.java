package com.appro.web.handler;

public class TooManyItemsException extends RuntimeException {

    private static final String MESSAGE = "There are too many images: %d, array max size is 20.";

    public TooManyItemsException(int size) {
        super(String.format(MESSAGE, size));
    }
}

