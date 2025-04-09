package buckpal.adapter.out;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import buckpal.application.domain.model.BlogId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "blog")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogJpaEntity {
	
	@Id
	private BlogId id;
	
	@Column
	private LocalDateTime updatedAt;
	
	@Column
	private LocalDateTime createdAt;
	
	@Column
	private String content;
	
	@Column
	private String title;
}
