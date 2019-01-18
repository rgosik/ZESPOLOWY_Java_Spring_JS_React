package springboot.first.ZespolowyBlog.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class BlogPostComment {

    @Id @GeneratedValue
    private Long id;
    private String content;
    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private BlogPost blogPost;


    BlogPostComment(String content, Date creationDate) {
        this.content = content;
        this.creationDate = creationDate;
    }
}
