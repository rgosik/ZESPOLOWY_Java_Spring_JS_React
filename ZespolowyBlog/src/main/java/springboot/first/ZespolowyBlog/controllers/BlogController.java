package springboot.first.ZespolowyBlog.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import springboot.first.ZespolowyBlog.models.Blog;
import springboot.first.ZespolowyBlog.models.BlogNotFoundException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

@Component
class BlogResourceAssembler implements ResourceAssembler<Blog, Resource<Blog>> {

    @Override
    public Resource<Blog> toResource(Blog blog) {

        return new Resource<>(blog,
                linkTo(methodOn(BlogController.class).one(blog.getId())).withSelfRel(),
                linkTo(methodOn(BlogController.class).all()).withRel("blogs"));
    }
}

@RestController
public class BlogController {

    private final BlogRepository repository;
    private final BlogResourceAssembler assembler;

    BlogController(BlogRepository repository, BlogResourceAssembler assembler) {

        this.repository = repository;
        this.assembler = assembler;
    }

    
    @GetMapping("/blogs")
    Resources<Resource<Blog>> all() {

        List<Resource<Blog>> blogs = repository.findAll().stream()
                .map(assembler::toResource).collect(Collectors.toList());

        return new Resources<>(blogs, linkTo(methodOn(BlogController.class).all()).withSelfRel());
    }
    
    @PostMapping("/blogs")
    ResponseEntity<?> newBlog(@RequestBody Blog newBlog) throws URISyntaxException {
        Resource<Blog> resource = assembler.toResource(repository.save(newBlog));

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    // Single item //

    @GetMapping("/blogs/{id}")
    Resource<Blog> one(@PathVariable Long id) {

        Blog blog = repository.findById(id)
                .orElseThrow(() -> new BlogNotFoundException(id));

        return assembler.toResource(blog);
    }

    @PutMapping("/blogs/{id}")
    ResponseEntity<?> replaceBlog(@RequestBody Blog newBlog, @PathVariable Long id) throws URISyntaxException {

        Blog updatedblog = repository.findById(id)
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

        Resource<Blog> resource = assembler.toResource(updatedblog);

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    @DeleteMapping("/blogs/{id}")
    ResponseEntity<?> deleteBlog(@PathVariable Long id) {

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

