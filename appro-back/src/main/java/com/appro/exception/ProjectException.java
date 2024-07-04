package com.appro.exception;

public class ProjectException extends RuntimeException {

    private static final String MESSAGE = "Error while updating project with id: %d";

    public ProjectException(int id) {
        super(String.format(MESSAGE, id));
    }
}
