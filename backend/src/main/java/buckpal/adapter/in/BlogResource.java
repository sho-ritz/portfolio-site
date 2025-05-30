package com.example.adapter.in;

import java.time.format.DateTimeFormatter;

import com.example.application.domain.model.Blog;

public class BlogResource {
    private final String id;
    private final String title;
    private final String content;
    private final String createdAt;
    private final String updatedAt;

    // コンストラクタで必須項目を初期化
    public BlogResource(Blog blog) {
        if (blog.getId() == null) {
            throw new IllegalArgumentException("id is necessary");
        }
        if (blog.getTitle() == null || blog.getTitle().isEmpty()) {
            throw new IllegalArgumentException("title is necessary");
        }
        if (blog.getContent() == null || blog.getContent().isEmpty()) {
            throw new IllegalArgumentException("content is necessary");
        }
        if (blog.getCreatedAt() == null) {
            throw new IllegalArgumentException("createdAt is necessary");
        }
        if (blog.getUpdatedAt() == null) {
            throw new IllegalArgumentException("updatedAt is necessary");
        }
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedCreatedAt = blog.getCreatedAt().format(formatter);
        String formattedUpdatedAt = blog.getUpdatedAt().format(formatter);
        
        this.id = blog.getId().getValue();
        this.title = blog.getTitle();
        this.content = blog.getContent();
        this.createdAt = formattedCreatedAt;
        this.updatedAt = formattedUpdatedAt;
    }
    
    public String getId() {
    	return id;
    }
    
    public String getTitle() {
    	return title;
    }
    
    public String getContent() {
    	return content;
    }
    
    public String getCreatedAt() {
    	return createdAt;
    }
    
    public String getUpdatedAt() {
    	return updatedAt;
    }
}
