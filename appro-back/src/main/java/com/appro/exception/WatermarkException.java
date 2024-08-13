package com.appro.exception;

public class WatermarkException extends RuntimeException {

    private static final String MESSAGE = "Failed to process the image file, adding watermark.";
    private static final String NULL_MESSAGE = "Source file, should not be null.";

    public WatermarkException(Throwable thrown) {
        super(MESSAGE, thrown);
    }

    public WatermarkException() {
        super(NULL_MESSAGE);
    }

    public WatermarkException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
