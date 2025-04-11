package buckpal.adapter.out;

import org.springframework.stereotype.Repository;

import buckpal.application.domain.model.Blog;
import buckpal.application.port.out.BlogRepository;
import buckpal.application.port.out.CreateBlogPort;
import buckpal.application.port.out.DeleteBlogPort;
import buckpal.application.port.out.UpdateBlogPort;

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
