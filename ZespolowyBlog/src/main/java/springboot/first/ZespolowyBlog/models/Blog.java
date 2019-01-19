package springboot.first.ZespolowyBlog.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Blog {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private String subject;
    private String description;
    private Date creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

    Blog(String name, String subject, String description, Date creationDate) {
        this.name = name;
        this.subject = subject;
        this.description = description;
        this.creationDate = creationDate;
    }
    Blog(){};
}
