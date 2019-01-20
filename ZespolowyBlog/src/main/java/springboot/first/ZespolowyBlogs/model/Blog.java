package springboot.first.ZespolowyBlogs.model;

import lombok.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_group")
public class Blog {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String subject; //address;
    private String description; //city;
    private Date creationDate; //stateOrProvince;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

}