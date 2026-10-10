package com.agridemand.backend.shop.service;

import com.agridemand.backend.shop.dto.ShopProfileResponse;
import com.agridemand.backend.shop.entity.ShopProfile;
import com.agridemand.backend.shop.repository.ShopProfileRepository;
import com.agridemand.backend.user.entity.User;
import com.agridemand.backend.user.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShopProfileService {

    private final UserRepository userRepository;
    private final ShopProfileRepository shopProfileRepository;

    public ShopProfileService(
            UserRepository userRepository,
            ShopProfileRepository shopProfileRepository) {
        this.userRepository = userRepository;
        this.shopProfileRepository = shopProfileRepository;
    }

    @Transactional(readOnly = true)
    public ShopProfileResponse getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        if (!"SHOP_OWNER".equals(user.getRole().name())) {
            throw new AccessDeniedException(
                    "Only shop owners can access this profile");
        }

        ShopProfile profile = shopProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Shop profile not found"));

        return new ShopProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getMobileNumber(),
                profile.getShopName(),
                profile.getShopAddress(),
                profile.getCity(),
                profile.getDistrict(),
                profile.getState(),
                profile.getDealerLicenseNumber(),
                profile.getGstin(),
                profile.getVerificationStatus().name()
        );
    }
}
