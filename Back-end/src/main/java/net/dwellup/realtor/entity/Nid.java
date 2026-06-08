package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "nid")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nid {
    @Id
    @Column(name = "NID")
    private Long nid;

    @Column(name = "User_ID")
    private Long userId;
}