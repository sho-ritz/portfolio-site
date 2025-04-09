package buckpal.application.domain.service;

import java.util.List;
import java.util.UUID;

import buckpal.adapter.out.BlogJpaEntity;
import buckpal.adapter.out.BlogMapper;
import buckpal.application.domain.exception.BlogNotFoundException;
import buckpal.application.domain.model.Blog;
import buckpal.application.domain.model.BlogId;
import buckpal.application.port.in.BlogUseCase;
import buckpal.application.port.in.CreateBlogCommand;
import buckpal.application.port.in.UpdateBlogCommand;
import buckpal.application.port.out.BlogRepository;
import buckpal.application.port.out.CreateBlogPort;
import buckpal.application.port.out.DeleteBlogPort;
import buckpal.application.port.out.UpdateBlogPort;

class BlogService implements BlogUseCase {
	
	private final CreateBlogPort createBlogPort;
	private final UpdateBlogPort updateBlogPort;
	private final DeleteBlogPort deleteBlogPort;
	private final BlogRepository blogRepository;

    public BlogService(CreateBlogPort createBlogPort, UpdateBlogPort updateBlogPort, BlogRepository blogRepository, DeleteBlogPort deleteBlogPort) {
        this.createBlogPort = createBlogPort;
        this.updateBlogPort = updateBlogPort;
        this.deleteBlogPort = deleteBlogPort;
        this.blogRepository = blogRepository;
    }
    
    @Override
    public List<Blog> getBlogs() {
    	return blogRepository.getAll();
    }

	@Override
	public boolean createBlog(CreateBlogCommand command) {
        BlogId blogId = new BlogId(UUID.randomUUID().toString());

        Blog blog = new Blog(blogId, command.getTitle(), command.getContent());
        return createBlogPort.createBlog(blog);
	}

	@Override
	public boolean updateBlog(UpdateBlogCommand command) {
		
        BlogId blogId = new BlogId(command.getId());
        
        BlogJpaEntity jpaBlogEntity = blogRepository.findById(blogId)
            .orElseThrow(() -> new BlogNotFoundException("Blog not found: " + blogId));
        
        Blog blog = BlogMapper.mapToBlogEntity(jpaBlogEntity);
        
        command.getTitle().ifPresent(blog::updateTitle);
        command.getContent().ifPresent(blog::updateContent);
        
        return updateBlogPort.updateBlog(blog);
		
	}

	@Override
	public boolean deleteBlog(String id) {
        BlogId blogId = new BlogId(id);
        
        BlogJpaEntity jpaBlogEntity = blogRepository.findById(blogId)
                .orElseThrow(() -> new BlogNotFoundException("Blog not found: " + id));
        
        Blog blog = BlogMapper.mapToBlogEntity(jpaBlogEntity);
        
        return deleteBlogPort.deleteBlog(blog);
	}
}
