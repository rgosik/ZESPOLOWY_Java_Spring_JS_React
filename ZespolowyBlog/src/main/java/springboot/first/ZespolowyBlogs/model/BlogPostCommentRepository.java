package springboot.first.ZespolowyBlogs.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostCommentRepository extends JpaRepository<BlogPostComment, Long> {

}