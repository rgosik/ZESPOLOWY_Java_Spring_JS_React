package springboot.first.ZespolowyBlog.models.exceptions;

public class UserNotFoundException extends RuntimeException {

   public UserNotFoundException(Long id) {
            super("Could not find Blog Post " + id);
    }
}

