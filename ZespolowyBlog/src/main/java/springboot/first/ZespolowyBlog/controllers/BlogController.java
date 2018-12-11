package springboot.first.ZespolowyBlog.controllers;

import java.util.List;
import springboot.first.ZespolowyBlog.models.Blog;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import springboot.first.ZespolowyBlog.models.BlogNotFoundException;

@RestController
public class BlogController {
    private final BlogRepository repository;

    BlogController(BlogRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/blogs")
    List<Blog> all() {
        return repository.findAll();
    }

    @PostMapping("/blogs")
    Blog newBlog(@RequestBody Blog newBlog) {
        return repository.save(newBlog);
    }

    // Single item //

    @GetMapping("/blogs/{id}")
    Blog one(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new BlogNotFoundException(id));
    }

    @PutMapping("/blogs/{id}")
    Blog replaceBlog(@RequestBody Blog newBlog, @PathVariable Long id) {

        return repository.findById(id)
                .map(Blog -> {
                    Blog.setName(newBlog.getName());
                    Blog.setDescription(newBlog.getDescription());
                    Blog.setCreationDate(newBlog.getCreationDate());
                    Blog.setSubject(newBlog.getSubject());
                    return repository.save(Blog);
                })
                .orElseGet(() -> {
                    newBlog.setId(id);
                    return repository.save(newBlog);
                });
    }

    @DeleteMapping("/blogs/{id}")
    void deleteBlog(@PathVariable Long id) {
        repository.deleteById(id);
    }
    // //
}

