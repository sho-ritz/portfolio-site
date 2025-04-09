package buckpal.application.port.out;

import buckpal.application.domain.model.Blog;

public interface DeleteBlogPort {
	public boolean deleteBlog(Blog blog);
}