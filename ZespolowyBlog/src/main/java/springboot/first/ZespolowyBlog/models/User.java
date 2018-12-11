package springboot.first.ZespolowyBlog.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
class User{

    private @Id @GeneratedValue Long id;
    private String firstName;
    private String lastName;
    private String profileDescription;
    private String email;


    User(String name, String role, String profileDescription, String email) {
        this.firstName = name;
        this.lastName = role;
        this.profileDescription = profileDescription;
        this.email = email;
    }
}