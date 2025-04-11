package buckpal.application.port.out;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import buckpal.adapter.out.BlogJpaEntity;

public interface BlogRepository extends JpaRepository<BlogJpaEntity, String> {
	@Query(
		"""
		select a from BlogJpaEntity a
		where a.id = :id
		"""
	)
	Optional<BlogJpaEntity> findById(
		@Param("id")  String id
	);
}
