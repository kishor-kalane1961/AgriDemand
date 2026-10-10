package com.agridemand.backend.shop.entity;

import com.agridemand.backend.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "shop_profiles")
@Getter
@Setter
@NoArgsConstructor
public class ShopProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 150)
    private String shopName;

    @Column(nullable = false, length = 255)
    private String shopAddress;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(nullable = false, unique = true, length = 100)
    private String dealerLicenseNumber;

    @Column(length = 20)
    private String gstin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private VerificationStatus verificationStatus =
            VerificationStatus.PENDING;

    public enum VerificationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}
