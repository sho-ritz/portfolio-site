package buckpal.application.port.in;

import java.util.Objects;

import jakarta.validation.constraints.NotNull;

public record CreateBlogCommand (
	String title,
	String content
) {
	public CreateBlogCommand(
			@NotNull String title,
			@NotNull String content
	) {
		Objects.requireNonNull(title);
		Objects.requireNonNull(content);
		
		this.title = title;
		this.content = content;
		
		Validator.validate(this);
	}
	
	public String getTitle() {
		return title;
	}
	
	public String getContent() {
		return content;
	}
}
