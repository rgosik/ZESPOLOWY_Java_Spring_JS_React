package springboot.first.ZespolowyBlogs.exceptions;

public class UserNotFoundException extends RuntimeException {

   public UserNotFoundException(String id) {
            super("Could not find Blog Post " + id);
    }
}

