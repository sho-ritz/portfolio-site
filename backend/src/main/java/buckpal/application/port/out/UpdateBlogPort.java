package com.example.application.port.out;

import com.example.application.domain.model.Blog;

public interface UpdateBlogPort {
	public boolean updateBlog(Blog blog);
}