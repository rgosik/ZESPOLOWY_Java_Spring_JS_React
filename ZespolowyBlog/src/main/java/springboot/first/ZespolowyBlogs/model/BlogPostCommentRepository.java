package springboot.first.ZespolowyBlogs.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlogPostCommentRepository extends JpaRepository<BlogPostComment, Long> {
    Page<BlogPostComment> findByBlogPostId(Long postId, Pageable pageable);
    Optional<BlogPostComment> findByIdAndBlogPostId(Long id, Long postId);
}