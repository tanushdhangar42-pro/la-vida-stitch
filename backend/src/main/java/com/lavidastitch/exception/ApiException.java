package com.lavidastitch.exception;

import org.springframework.http.HttpStatus;

/** Thrown by services when a request cannot be completed. Carries the HTTP status to return. */
public class ApiException extends RuntimeException {
    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
