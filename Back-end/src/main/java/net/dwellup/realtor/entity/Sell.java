package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sells")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sell {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Property_ID")
    private Long propertyId;

    @Column(name = "Property_type", nullable = false, length = 255)
    private String propertyType;

    @Column(name = "Description", nullable = false, length = 255)
    private String description;

    @Column(name = "Price", nullable = false)
    private float price;

    @Column(name = "Status", nullable = false, length = 255)
    private String status;

    @Column(name = "Listing_date", nullable = false, length = 255)
    private String listingDate;

    @Column(name = "Address", length = 255)
    private String address;

    @Column(name = "City", length = 255)
    private String city;

    @Column(name = "State", length = 255)
    private String state;

    @Column(name = "Zip_code", length = 255)
    private String zipCode;

    @Column(name = "Number_of_Bedroom")
    private Integer numberOfBedroom;

    @Column(name = "Number_of_Bathroom")
    private Integer numberOfBathroom;

    @Column(name = "Size")
    private Float size;

    @Lob
    @Column(name = "Preview_Image",columnDefinition = "LONGBLOB")
    private byte[] previewImage;

    @Lob
    @Column(name = "Image_1",columnDefinition = "LONGBLOB")
    private byte[] image1;

    @Lob
    @Column(name = "Image_2",columnDefinition = "LONGBLOB")
    private byte[] image2;

    @Lob
    @Column(name = "Image_3",columnDefinition = "LONGBLOB")
    private byte[] image3;

    @Lob
    @Column(name = "Image_4",columnDefinition = "LONGBLOB")
    private byte[] image4;

    @Lob
    @Column(name = "Image_5",columnDefinition = "LONGBLOB")
    private byte[] image5;

    @Column(name = "user_name", length = 255)
    private String userName;

    @Column(name = "user_id")
    private Long userId;
}
