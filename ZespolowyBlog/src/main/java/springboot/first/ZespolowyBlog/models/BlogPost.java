package springboot.first.ZespolowyBlog.models;

import lombok.Data;
import java.util.Date;

import javax.persistence.*;

@Data
@Entity
public class BlogPost {

    @Id @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private  User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Blog blog;


    BlogPost(String title, String content, Date creationDate, User user, Blog blog) {
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
        this.user = user;
        this.blog = blog;
    }
}
