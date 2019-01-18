package springboot.first.ZespolowyBlog.models;

public class BlogPostNotFoundException extends RuntimeException {

   public BlogPostNotFoundException(Long id) {
            super("Could not find Blog Post " + id);
    }
}

