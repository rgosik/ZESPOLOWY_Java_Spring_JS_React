package springboot.first.ZespolowyBlog.controllers;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot.first.ZespolowyBlog.models.BlogPostComment;

interface BlogPosCommentRepository extends JpaRepository<BlogPostComment, Long> {

}