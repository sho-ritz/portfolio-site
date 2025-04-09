package buckpal.application.port.out;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import buckpal.adapter.out.BlogJpaEntity;
import buckpal.application.domain.model.Blog;
import buckpal.application.domain.model.BlogId;

public interface BlogRepository extends JpaRepository<BlogJpaEntity, BlogId> {
	@Query(
		"""
		select a from BlogJpaEntity a
		a.id = :id
		"""
	)
	Blog findById(
		@Param("id")  Long id
	);
	
	
	
}
