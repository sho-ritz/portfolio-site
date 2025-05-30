package com.example.application.port.in;

import java.util.Objects;
import java.util.Optional;

import jakarta.validation.constraints.NotNull;

public class UpdateBlogCommand {
	String id;
	Optional<String> title;
	Optional<String> content;
	
	public UpdateBlogCommand(
			@NotNull String id,
			Optional<String> title,
			Optional<String> content
	) {
		Objects.requireNonNull(id);
		
		this.title = title;
		this.content = content;
		this.id = id;
		
		Validator.validate(this);
	}
	
	public Optional<String> getTitle() {
		return title;
	}
	
	public Optional<String> getContent() {
		return content;
	}
	
	public String getId() {
		return id;
	}
}
