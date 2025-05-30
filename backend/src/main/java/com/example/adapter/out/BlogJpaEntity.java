package com.example.adapter.out;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
	private String id;
	
	@Column
	private LocalDateTime updatedAt;
	
	@Column
	private LocalDateTime createdAt;
	
	@Column
	private String title;
	
	@Column
	private String content;
}
