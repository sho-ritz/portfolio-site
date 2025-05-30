package com.example.adapter.out;

import org.springframework.stereotype.Repository;

import com.example.application.domain.model.Blog;
import com.example.application.port.out.BlogRepository;
import com.example.application.port.out.CreateBlogPort;
import com.example.application.port.out.DeleteBlogPort;
import com.example.application.port.out.UpdateBlogPort;

@Repository
class BlogPersistanceAdapter implements CreateBlogPort, UpdateBlogPort, DeleteBlogPort {
	
	private final BlogRepository blogRepository;
	
	public BlogPersistanceAdapter(
			BlogRepository blogRepository
			) {
		this.blogRepository = blogRepository;
	}

	@Override
	public boolean createBlog(Blog blog) {
 
        blogRepository.save(BlogMapper.mapToBlogJpaEntity(blog));
        
        return true;
	}

	@Override
	public boolean updateBlog(Blog blog) {
        blogRepository.save(BlogMapper.mapToBlogJpaEntity(blog));
        
        return true;
		
	}

	@Override
	public boolean deleteBlog(Blog blog) {
		
        blogRepository.delete(BlogMapper.mapToBlogJpaEntity(blog));
        
        return true;
        
        
	}
}
