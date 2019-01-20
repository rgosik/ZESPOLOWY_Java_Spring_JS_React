package springboot.first.ZespolowyBlogs.controllers;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import springboot.first.ZespolowyBlogs.model.Blog;
import springboot.first.ZespolowyBlogs.exceptions.BlogNotFoundException;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;
import springboot.first.ZespolowyBlogs.model.User;
import springboot.first.ZespolowyBlogs.model.UserRepository;
import springboot.first.ZespolowyBlogs.model.BlogRepository;


import javax.validation.Valid;

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
@RequestMapping("/api")
public class BlogController {

    private BlogRepository repository;
    private UserRepository userRepository;
    private final BlogResourceAssembler assembler;
    private final Logger log = LoggerFactory.getLogger(BlogController.class);

    BlogController(BlogRepository repository, BlogResourceAssembler assembler, UserRepository userRepository) {

        this.repository = repository;
        this.assembler = assembler;
        this.userRepository = userRepository;
    }


    @GetMapping("/blogsAll")
    Resources<Resource<Blog>> all() {

        List<Resource<Blog>> blogs = repository.findAll().stream()
                .map(assembler::toResource).collect(Collectors.toList());

        return new Resources<>(blogs, linkTo(methodOn(BlogController.class).all()).withSelfRel());
    }

    @GetMapping("/blogs")
    Collection<Blog> groups(Principal principal) {
        return repository.findAllByUserId(principal.getName());
    }

    @PostMapping("/blogs")
    ResponseEntity<?> newBlog(@Valid @RequestBody Blog newBlog, @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        Resource<Blog> resource = assembler.toResource(repository.save(newBlog));

        log.info("Request to create group: {}", newBlog);
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        Optional<User> user = userRepository.findById(userId);
        newBlog.setUser(user.orElse(new User(userId,
                details.get("firstName").toString(), details.get("lastName").toString(), details.get("profileDescription").toString(), details.get("email").toString())));

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
                    Blog.setUser(newBlog.getUser());
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

