package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "description")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Description {

    @Id
    @Column(name = "Property_ID")
    private Long propertyId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "Property_ID")
    private Property property;

    private String address;
    private String city;
    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "Number_of_Bedroom")
    private int numberOfBedroom;

    @Column(name = "Number_of_Bathroom")
    private int numberOfBathroom;

    @Column(name = "Size")
    private double size;
}
