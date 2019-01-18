package springboot.first.ZespolowyBlog.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class User{

    @Id @GeneratedValue
    private  Long id;

    private String firstName;
    private String lastName;
    private String profileDescription;
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    private Blog blog;

    User(String firstName, String lastName, String profileDescription, String email, Blog blog) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileDescription = profileDescription;
        this.email = email;
        this.blog =blog;
    }
}