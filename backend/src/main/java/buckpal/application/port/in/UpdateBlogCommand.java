package buckpal.application.port.in;

import java.util.Objects;

import jakarta.validation.constraints.NotNull;

import buckpal.application.domain.model.BlogId;

public record UpdateBlogCommand (
	String title,
	String content,
	BlogId id
) {
	public UpdateBlogCommand(
			@NotNull String title,
			@NotNull String content,
			@NotNull BlogId id
	) {
		Objects.requireNonNull(title);
		Objects.requireNonNull(content);
		
		this.title = title;
		this.content = content;
		this.id = id;
		
		Validator.validate(this);
	}
	
	public String getTitle() {
		return title;
	}
	
	public String getContent() {
		return content;
	}
	
	public BlogId getId() {
		return id;
	}
}
