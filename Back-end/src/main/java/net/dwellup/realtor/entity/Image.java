package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "image")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Image_ID")
    private Long imageId;

    @Column(name = "User_ID")
    private Long userId;

    @OneToOne
    @JoinColumn(name = "Property_ID", referencedColumnName = "Property_ID", nullable = true)
    private Property property;

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


}
