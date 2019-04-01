package springboot.first.ZespolowyBlogs.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import springboot.first.ZespolowyBlogs.exceptions.BlogPostCommentNotFoundException;
import springboot.first.ZespolowyBlogs.model.BlogPost;
import springboot.first.ZespolowyBlogs.model.BlogPostComment;
import springboot.first.ZespolowyBlogs.model.BlogPostCommentRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
class BlogPostCommentResourceAssembler implements ResourceAssembler<BlogPostComment, Resource<BlogPostComment>> {

    @Override
    public Resource<BlogPostComment> toResource(BlogPostComment blogPostComment) {

        return new Resource<>(blogPostComment,
                linkTo(methodOn(BlogPostCommentController.class).one(blogPostComment.getId())).withSelfRel(),
                linkTo(methodOn(BlogPostCommentController.class).all()).withRel("blogPostComments"));
    }
}

@RestController
public class BlogPostCommentController {

    private final BlogPostCommentRepository repository;
    private final BlogPostCommentResourceAssembler assembler;

    BlogPostCommentController(BlogPostCommentRepository repository, BlogPostCommentResourceAssembler assembler) {

        this.repository = repository;
        this.assembler = assembler;
    }

    
    @GetMapping("/blogPostComments")
    Resources<Resource<BlogPostComment>> all() {

        List<Resource<BlogPostComment>> blogPostComment = repository.findAll().stream()
                .map(assembler::toResource).collect(Collectors.toList());

        return new Resources<>(blogPostComment, linkTo(methodOn(BlogPostCommentController.class).all()).withSelfRel());
    }
    
    @PostMapping("/blogPostComments")
    ResponseEntity<?> newBlogPostComment(@RequestBody BlogPostComment newBlogPostComment) throws URISyntaxException {
        Resource<BlogPostComment> resource = assembler.toResource(repository.save(newBlogPostComment));

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    @GetMapping("/blogPostComments/{id}")
    Resource<BlogPostComment> one(@PathVariable Long id) {

        BlogPostComment blogPostComment = repository.findById(id)
                .orElseThrow(() -> new BlogPostCommentNotFoundException(id));

        return assembler.toResource(blogPostComment);
    }

    @GetMapping("/blogPostComments/{id}/blogPosts")
    public Page<BlogPostComment> getAllCommentsByPostId(@PathVariable (value = "id") Long blogPostId,
                                                 Pageable pageable) {
        return repository.findByBlogPostId(blogPostId, pageable);
    }

    @PutMapping("/blogPostComments/{id}")
    ResponseEntity<?> replaceBlogPostComment(@RequestBody BlogPostComment newBlogPostComment, @PathVariable Long id) throws URISyntaxException {

        BlogPostComment updatedblogPostComment = repository.findById(id)
                .map(BlogPostComment -> {
                    BlogPostComment.setContent(newBlogPostComment.getContent());
                    BlogPostComment.setCreationDate(newBlogPostComment.getCreationDate());
                    return repository.save(BlogPostComment);
                })
                .orElseGet(() -> {
                    newBlogPostComment.setId(id);
                    return repository.save(newBlogPostComment);
                });

        Resource<BlogPostComment> resource = assembler.toResource(updatedblogPostComment);

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    @DeleteMapping("/blogPostComments/{id}")
    ResponseEntity<?> deleteBlogPostComment(@PathVariable Long id) {

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

