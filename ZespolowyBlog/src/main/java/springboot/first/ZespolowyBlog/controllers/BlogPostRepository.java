package springboot.first.ZespolowyBlog.controllers;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot.first.ZespolowyBlog.models.BlogPost;

interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

}