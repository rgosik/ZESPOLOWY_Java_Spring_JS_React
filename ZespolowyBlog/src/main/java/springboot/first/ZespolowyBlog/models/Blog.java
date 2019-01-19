package springboot.first.ZespolowyBlog.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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


    Blog(String name, String subject, String description, Date creationDate) {
        this.name = name;
        this.subject = subject;
        this.description = description;
        this.creationDate = creationDate;
    }
    Blog(){};
}
