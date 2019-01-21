package springboot.first.ZespolowyBlogs.controllers;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import springboot.first.ZespolowyBlogs.exceptions.BlogPostNotFoundException;
import springboot.first.ZespolowyBlogs.model.BlogPost;
import springboot.first.ZespolowyBlogs.model.BlogPostRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import org.springframework.beans.factory.annotation.Autowired;

@Component
class BlogPostResourceAssembler implements ResourceAssembler<BlogPost, Resource<BlogPost>> {

    @Override
    public Resource<BlogPost> toResource(BlogPost blogPost) {

        return new Resource<>(blogPost,
                linkTo(methodOn(BlogPostController.class).one(blogPost.getId())).withSelfRel(),
                linkTo(methodOn(BlogPostController.class).all()).withRel("blogPosts"));
    }
}

@RestController
public class BlogPostController {

    private final BlogPostRepository repository;
    private final BlogPostResourceAssembler assembler;

    BlogPostController(BlogPostRepository repository, BlogPostResourceAssembler assembler) {

        this.repository = repository;
        this.assembler = assembler;
    }

    
    @GetMapping("/blogPosts")
    Resources<Resource<BlogPost>> all() {

        List<Resource<BlogPost>> blogPosts = repository.findAll().stream()
                .map(assembler::toResource).collect(Collectors.toList());

        return new Resources<>(blogPosts, linkTo(methodOn(BlogPostController.class).all()).withSelfRel());
    }
    
    @PostMapping("/blogPosts")
    ResponseEntity<?> newBlogPost(@RequestBody BlogPost newBlogPost) throws URISyntaxException {
        Resource<BlogPost> resource = assembler.toResource(repository.save(newBlogPost));

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    // Single item //

    @GetMapping("/blogPosts/{id}")
    Resource<BlogPost> one(@PathVariable Long id) {

        BlogPost blogPost = repository.findById(id)
                .orElseThrow(() -> new BlogPostNotFoundException(id));

        return assembler.toResource(blogPost);
    }

    @GetMapping("/blogPosts/{id}/posts")
    public Page<BlogPost> getAllCommentsByPostId(@PathVariable (value = "id") Long blogId,
                                                Pageable pageable) {
        return repository.findByBlogId(blogId, pageable);
    }

    @PutMapping("/blogPosts/{id}")
    ResponseEntity<?> replaceBlog(@RequestBody BlogPost newBlogPost, @PathVariable Long id) throws URISyntaxException {

        BlogPost updatedblogPost = repository.findById(id)
                .map(BlogPost -> {
                    BlogPost.setTitle(newBlogPost.getTitle());
                    BlogPost.setContent(newBlogPost.getContent());
                    BlogPost.setCreationDate(newBlogPost.getCreationDate());
                    return repository.save(BlogPost);
                })
                .orElseGet(() -> {
                    newBlogPost.setId(id);
                    return repository.save(newBlogPost);
                });

        Resource<BlogPost> resource = assembler.toResource(updatedblogPost);

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    @DeleteMapping("/blogPosts/{id}")
    ResponseEntity<?> deleteBlogPost(@PathVariable Long id) {

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

