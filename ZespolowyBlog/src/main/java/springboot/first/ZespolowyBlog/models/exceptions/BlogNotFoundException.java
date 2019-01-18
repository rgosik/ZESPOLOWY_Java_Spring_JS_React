package springboot.first.ZespolowyBlog.models.exceptions;

public class BlogNotFoundException extends RuntimeException {

   public BlogNotFoundException(Long id) {
            super("Could not find Blog " + id);
    }
}

