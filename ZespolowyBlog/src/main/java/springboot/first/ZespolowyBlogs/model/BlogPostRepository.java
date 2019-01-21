package springboot.first.ZespolowyBlogs.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    Page<BlogPost> findByBlogId(Long postId, Pageable pageable);
    Optional<BlogPost> findByIdAndBlogId(Long id, Long postId);

}