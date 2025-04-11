package buckpal.adapter.out;

import buckpal.application.domain.model.Blog;
import buckpal.application.domain.model.BlogId;

public class BlogMapper {
	public static BlogJpaEntity mapToBlogJpaEntity(Blog blog) {
		return new BlogJpaEntity(
				blog.getId().toString(),
				blog.getUpdatedAt(),
				blog.getCreatedAt(),
				blog.getTitle(),
				blog.getContent()
				);
	}
	
	public static Blog mapToBlogEntity(BlogJpaEntity blog) {
		return new Blog(
				new BlogId(blog.getId()),
				blog.getTitle(),
				blog.getContent()
				);
	}
}
