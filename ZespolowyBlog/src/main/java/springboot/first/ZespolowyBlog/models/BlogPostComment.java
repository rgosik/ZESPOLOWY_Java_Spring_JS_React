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
    @JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name="BLOGPOST_ID")
    private BlogPost blogPost;


    BlogPostComment(String content, Date creationDate) {
        this.content = content;
        this.creationDate = creationDate;
    }
}
