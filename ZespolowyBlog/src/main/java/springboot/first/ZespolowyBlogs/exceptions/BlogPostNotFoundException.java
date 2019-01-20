package springboot.first.ZespolowyBlogs.exceptions;

public class BlogPostNotFoundException extends RuntimeException {

   public BlogPostNotFoundException(Long id) {
            super("Could not find Blog Post " + id);
    }
}

