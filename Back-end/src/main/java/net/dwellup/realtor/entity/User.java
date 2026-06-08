package net.dwellup.realtor.entity;
import jakarta.persistence.* ;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_ID")
    private Long userId;

    private String name;
    private String email;
    private String password;

    @Column(name = "User_type")
    private String userType;

    @Column(name = "Phone_NO")
    private String phoneNo;

    private String doB;
    private String address;
    private String about;
}
