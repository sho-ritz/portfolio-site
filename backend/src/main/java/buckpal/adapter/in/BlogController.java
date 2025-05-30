package com.example.adapter.in;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.domain.model.Blog;
import com.example.application.port.in.BlogUseCase;
import com.example.application.port.in.CreateBlogCommand;
import com.example.application.port.in.UpdateBlogCommand;

@RestController
@RequestMapping("/blogs")
public class BlogController {
	private BlogUseCase blogUseCase;
	
	public BlogController (
			BlogUseCase blogUseCase
			) {
		this.blogUseCase = blogUseCase;
	}
	
	@GetMapping("/get-all")
	List<BlogResource> getBlogs() {
	    List<Blog> blogs = blogUseCase.getBlogs();
	    return blogs.stream()
	                .map(BlogResource::new)
	                .toList();
	}
	
    @PostMapping("/create")
    public ResponseEntity<Void> createBlog(@RequestBody CreateBlogRequest request) {
        CreateBlogCommand command = new CreateBlogCommand(request.getTitle(), request.getContent());
        blogUseCase.createBlog(command);

        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/update")
    public ResponseEntity<Void> updateBlog(@RequestBody UpdateBlogRequest request) {
        UpdateBlogCommand command = new UpdateBlogCommand(request.getId(), request.getTitle(), request.getContent());
        blogUseCase.updateBlog(command);

        return ResponseEntity.ok().build();
    }
}
