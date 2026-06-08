package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "property")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Property_ID")
    private Long propertyId;

    @Column(name = "property_type")
    private String propertyType;

    private String description;

    @Column(name = "Price")
    private double price;

    private String status;

    @Column(name = "Listing_date")
    private String listingDate;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL)
    private Description detailedDescription;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL)
    private Image image;
}
