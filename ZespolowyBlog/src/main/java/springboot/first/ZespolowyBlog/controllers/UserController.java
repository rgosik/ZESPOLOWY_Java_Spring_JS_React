package springboot.first.ZespolowyBlog.controllers;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import springboot.first.ZespolowyBlog.models.User;
import springboot.first.ZespolowyBlog.models.exceptions.UserNotFoundException;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
class UserResourceAssembler implements ResourceAssembler<User, Resource<User>> {

    @Override
    public Resource<User> toResource(User user) {

        return new Resource<>(user,
                linkTo(methodOn(UserController.class).one(user.getId())).withSelfRel(),
                linkTo(methodOn(UserController.class).all()).withRel("users"));
    }
}

@RestController
public class UserController {

    private final UserRepository repository;
    private final UserResourceAssembler assembler;

    UserController(UserRepository repository, UserResourceAssembler assembler) {

        this.repository = repository;
        this.assembler = assembler;
    }

    
    @GetMapping("/users")
    Resources<Resource<User>> all() {

        List<Resource<User>> users = repository.findAll().stream()
                .map(assembler::toResource).collect(Collectors.toList());

        return new Resources<>(users, linkTo(methodOn(BlogController.class).all()).withSelfRel());
    }
    
    @PostMapping("/users")
    ResponseEntity<?> newUser(@RequestBody User newUser) throws URISyntaxException {
        Resource<User> resource = assembler.toResource(repository.save(newUser));

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    // Single item //

    @GetMapping("/users/{id}")
    Resource<User> one(@PathVariable Long id) {

        User user = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        return assembler.toResource(user);
    }

    @PutMapping("/users/{id}")
    ResponseEntity<?> replaceUser(@RequestBody User newUser, @PathVariable Long id) throws URISyntaxException {

        User updateduser= repository.findById(id)
                .map(User -> {
                    User.setFirstName(newUser.getFirstName());
                    User.setLastName(newUser.getLastName());
                    User.setProfileDescription(newUser.getProfileDescription());
                    User.setEmail(newUser.getEmail());

                    return repository.save(User);
                })
                .orElseGet(() -> {
                    newUser.setId(id);
                    return repository.save(newUser);
                });

        Resource<User> resource = assembler.toResource(updateduser);

        return ResponseEntity.created(new URI(resource.getId().expand().getHref())).body(resource);
    }

    @DeleteMapping("/users/{id}")
    ResponseEntity<?> deleteUser(@PathVariable Long id) {

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

