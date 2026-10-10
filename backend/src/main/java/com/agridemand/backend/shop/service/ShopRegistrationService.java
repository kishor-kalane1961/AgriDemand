package com.agridemand.backend.shop.service;

import com.agridemand.backend.shop.dto.ShopRegistrationRequest;
import com.agridemand.backend.shop.entity.ShopProfile;
import com.agridemand.backend.shop.repository.ShopProfileRepository;
import com.agridemand.backend.user.entity.User;
import com.agridemand.backend.user.enums.Role;
import com.agridemand.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShopRegistrationService {

    private final UserRepository userRepository;
    private final ShopProfileRepository shopProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public ShopRegistrationService(
            UserRepository userRepository,
            ShopProfileRepository shopProfileRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.shopProfileRepository = shopProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void registerShop(ShopRegistrationRequest request) {

        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new IllegalArgumentException(
                    "Email is already registered");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException(
                    "Passwords do not match");
        }

        if (shopProfileRepository.existsByDealerLicenseNumber(
                request.getDealerLicenseNumber().trim())) {
            throw new IllegalArgumentException(
                    "Dealer license number is already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setMobileNumber(request.getMobileNumber().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.SHOP_OWNER);
        user.setEnabled(true);

        userRepository.save(user);

        ShopProfile profile = new ShopProfile();
        profile.setUser(user);
        profile.setShopName(request.getShopName().trim());
        profile.setShopAddress(request.getShopAddress().trim());
        profile.setCity(request.getCity().trim());
        profile.setDistrict(request.getDistrict().trim());
        profile.setState(request.getState().trim());
        profile.setDealerLicenseNumber(
                request.getDealerLicenseNumber().trim());
        profile.setGstin(request.getGstin());
        profile.setVerificationStatus(
                ShopProfile.VerificationStatus.PENDING);

        shopProfileRepository.save(profile);
    }
}
