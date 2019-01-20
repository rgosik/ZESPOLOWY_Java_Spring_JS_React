package springboot.first.ZespolowyBlogs.exceptions;

public class BlogPostCommentNotFoundException extends RuntimeException {

   public BlogPostCommentNotFoundException(Long id) {
            super("Could not find Comment " + id);
    }
}

