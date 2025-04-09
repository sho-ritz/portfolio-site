package buckpal.application.port.out;

import buckpal.application.domain.model.Blog;

public interface UpdateBlogPort {
	public boolean updateBlog(Blog blog);
}