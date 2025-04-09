package buckpal.adapter.in;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import buckpal.application.domain.model.Blog;
import buckpal.application.port.in.BlogUseCase;
import buckpal.application.port.in.CreateBlogCommand;
import buckpal.application.port.in.UpdateBlogCommand;

@RestController
@RequestMapping("/blogs")
public class BlogController {
	private BlogUseCase blogUseCase;
	
	@GetMapping("/get-all")
	List<BlogResource> getBlogs() {
	    List<Blog> blogs = blogUseCase.getBlogs();
	    return blogs.stream()
	                .map(BlogResource::new)
	                .toList();
	}
	
    @PostMapping
    public ResponseEntity<Void> createBlog(@RequestBody CreateBlogRequest request) {
        // 受け取ったJSONは自動的にBlogRequestにマッピングされる
        CreateBlogCommand command = new CreateBlogCommand(request.getTitle(), request.getContent());
        blogUseCase.createBlog(command);

        return ResponseEntity.ok().build();
    }
    
    @PostMapping
    public ResponseEntity<Void> updateBlog(@RequestBody UpdateBlogRequest request) {
        // 受け取ったJSONは自動的にBlogRequestにマッピングされる
        UpdateBlogCommand command = new UpdateBlogCommand(request.getId(), request.getTitle(), request.getContent());
        blogUseCase.updateBlog(command);

        return ResponseEntity.ok().build();
    }
}
