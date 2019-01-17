package springboot.first.ZespolowyBlog.models;

import lombok.Data;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class BlogPost {

    private @Id @GeneratedValue Long id;
    private String title;
    private String content;
    private Date creationDate;
    private @ManyToOne User user;
    private @ManyToOne Blog blog;


    BlogPost(String title, String content, Date creationDate, User user, Blog blog) {
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
        this.user = user;
        this.blog = blog;
    }
}
