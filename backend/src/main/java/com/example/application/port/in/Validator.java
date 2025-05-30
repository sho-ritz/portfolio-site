package com.example.application.port.in;

import java.util.Set;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validation;

public class Validator {
	private final static jakarta.validation.Validator validator = 
			Validation.buildDefaultValidatorFactory()
				.getValidator();
	
	public static <T> void validate(T subject) {
		Set<ConstraintViolation<T>> violations = validator.validate(subject);
		if (!violations.isEmpty()) {
			throw new ConstraintViolationException(violations);
		}
	}
}
