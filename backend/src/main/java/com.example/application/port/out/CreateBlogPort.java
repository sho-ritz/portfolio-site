package com.example.application.port.out;

import com.example.application.domain.model.Blog;

public interface CreateBlogPort {
	public boolean createBlog(Blog blog);
}