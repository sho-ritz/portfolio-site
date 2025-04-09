package buckpal.adapter.out;

import buckpal.application.domain.model.Blog;

public class BlogMapper {
	public static BlogJpaEntity mapToBlogJpaEntity(Blog blog) {
		return new BlogJpaEntity(
				blog.getId(),
				blog.getUpdatedAt(),
				blog.getCreatedAt(),
				blog.getTitle(),
				blog.getContent()
				);
	}
	
	public static Blog mapToBlogEntity(BlogJpaEntity blog) {
		return new Blog(
				blog.getId(),
				blog.getTitle(),
				blog.getContent()
				);
	}
}
