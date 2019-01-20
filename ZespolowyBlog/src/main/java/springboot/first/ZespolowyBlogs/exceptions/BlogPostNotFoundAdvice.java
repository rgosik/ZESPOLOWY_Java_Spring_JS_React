package springboot.first.ZespolowyBlogs.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class BlogPostNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(BlogPostNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String BlogPostNotFoundHandler(BlogPostNotFoundException ex) {
        return ex.getMessage();
    }
}
