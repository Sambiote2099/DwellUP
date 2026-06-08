package net.dwellup.realtor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Report_ID")
    private Long reportId;

    @Column(name = "Agent_ID")
    private Long agentId;

    @Column(name = "Property_ID")
    private Long propertyId;

    @Lob
    @Column(name = "Report_PDF",columnDefinition = "LONGBLOB")
    private byte[] reportPdf;

    @Column(name = "Time_stamp")
    private String timeStamp;

}
