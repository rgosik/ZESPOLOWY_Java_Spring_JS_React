package springboot.first.ZespolowyBlogs.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @Id
    private String id;

    private String firstName;
    private String lastName;
    private String email;

    public User(String id){
        this.id = id;
    }
}