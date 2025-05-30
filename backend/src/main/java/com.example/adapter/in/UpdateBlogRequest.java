package com.example.adapter.in;

import java.util.Optional;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBlogRequest {
	private String id;
    private Optional<String> title;
    private Optional<String> content;
}

