package com.agridemand.backend.shop.repository;

import com.agridemand.backend.shop.entity.ShopProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShopProfileRepository
        extends JpaRepository<ShopProfile, Long> {

    Optional<ShopProfile> findByUserId(Long userId);

    List<ShopProfile> findByVerificationStatus(
            ShopProfile.VerificationStatus status
    );

    boolean existsByDealerLicenseNumber(String dealerLicenseNumber);
}
