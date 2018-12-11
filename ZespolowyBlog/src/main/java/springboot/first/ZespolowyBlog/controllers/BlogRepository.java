package springboot.first.ZespolowyBlog.controllers;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot.first.ZespolowyBlog.models.Blog;

interface BlogRepository extends JpaRepository<Blog, Long> {

}