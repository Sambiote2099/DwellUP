package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "listing")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Listing {

    @Id
    @Column(name = "Property_ID")
    private Long propertyId;

    @Column(name = "Agent_ID", nullable = false)
    private Long agentId;
}
