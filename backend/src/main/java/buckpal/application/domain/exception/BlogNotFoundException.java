package com.example.application.domain.exception;

public class BlogNotFoundException extends RuntimeException {
    public BlogNotFoundException(String msg) {
        super(msg);
    }
}