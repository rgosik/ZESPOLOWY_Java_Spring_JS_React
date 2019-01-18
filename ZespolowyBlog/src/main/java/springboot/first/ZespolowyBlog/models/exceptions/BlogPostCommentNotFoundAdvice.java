package springboot.first.ZespolowyBlog.models.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class BlogPostCommentNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(BlogPostCommentNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String BlogPostCommentNotFoundHandler(BlogPostCommentNotFoundException ex) {
        return ex.getMessage();
    }
}
