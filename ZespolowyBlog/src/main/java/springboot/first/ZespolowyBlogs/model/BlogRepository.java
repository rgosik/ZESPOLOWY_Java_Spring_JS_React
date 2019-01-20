package springboot.first.ZespolowyBlogs.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Blog findByName(String name);
    List<Blog> findAllByUserId(String id);
}