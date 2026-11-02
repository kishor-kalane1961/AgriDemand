package com.agridemand.backend.farmer.entity;

import com.agridemand.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_crops")
@Getter
@Setter
@NoArgsConstructor
public class FarmerCrop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @Column(nullable = false, length = 100)
    private String cropName;

    @Column(nullable = false, length = 150)
    private String seedVariety;

    @Column(nullable = false, length = 30)
    private String season;

    @Column(nullable = false, length = 50)
    private String cropStage;

    @Column(nullable = false)
    private Double farmAreaAcres;

    @Column(nullable = false)
    private LocalDate plantingDate;

    @Column(nullable = false)
    private LocalDate expectedHarvestDate;

    @Column(nullable = false, length = 30)
    private String health;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}