package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "appointment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Appointment_ID")
    private Long appointmentId;

    @Column(name = "User_ID")
    private Long userId;

    @Column(name = "Property_ID")
    private Long propertyId;

    @Column(name = "Appointment_date")
    private String appointmentDate;

    @Column(name = "agent_id")
    private Long agentId;
}
