package com.example.application.port.out;

import com.example.application.domain.model.Blog;

public interface DeleteBlogPort {
	public boolean deleteBlog(Blog blog);
}