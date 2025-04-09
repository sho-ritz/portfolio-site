package buckpal.application.port.out;

import buckpal.application.domain.model.Blog;

public interface CreateBlogPort {
	public boolean createBlog(Blog blog);
}