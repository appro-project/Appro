package com.appro.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ProjectNotFoundException extends RuntimeException {

    private static final String MESSAGE = "Project with id: %s does not exist";

    public ProjectNotFoundException(int id) {
        super(String.format(MESSAGE, id));
    }
}
