package com.farmManager.farmManager.exception;

public class AnimalNotFoundException extends  RuntimeException {
    public AnimalNotFoundException(String message) {
        super(message);
    }
}
