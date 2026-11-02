package com.agridemand.backend.farmer.service;

import com.agridemand.backend.farmer.dto.FarmerProfileResponse;
import com.agridemand.backend.farmer.dto.FarmerProfileUpdateRequest;
import com.agridemand.backend.farmer.entity.FarmerProfile;
import com.agridemand.backend.farmer.repository.FarmerProfileRepository;
import com.agridemand.backend.user.entity.User;
import com.agridemand.backend.user.repository.UserRepository;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FarmerProfileService {

    private final UserRepository userRepository;
    private final FarmerProfileRepository farmerProfileRepository;

    public FarmerProfileService(
            UserRepository userRepository,
            FarmerProfileRepository farmerProfileRepository) {

        this.userRepository = userRepository;
        this.farmerProfileRepository = farmerProfileRepository;
    }

    @Transactional(readOnly = true)
    public FarmerProfileResponse getMyProfile(String email) {

        User user = getAuthenticatedFarmer(email);

        FarmerProfile profile = farmerProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Farmer profile not found"));

        return toResponse(user, profile);
    }

    @Transactional
    public FarmerProfileResponse updateMyProfile(
            String email,
            FarmerProfileUpdateRequest request) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Profile update data is required");
        }

        User user = getAuthenticatedFarmer(email);

        FarmerProfile profile = farmerProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Farmer profile not found"));

        // Validate required fields
        String fullName = requireText(
                request.getFullName(), "Full name");

        String address = requireText(
                request.getResidentialAddress(),
                "Residential address");

        String village = requireText(
                request.getVillage(), "Village");

        String district = requireText(
                request.getDistrict(), "District");

        String state = requireText(
                request.getState(), "State");

        Double landholding = request.getLandholdingAcres();

        if (landholding == null
                || !Double.isFinite(landholding)
                || landholding < 0) {

            throw new IllegalArgumentException(
                    "Landholding must be a valid, non-negative number");
        }

        // Update User entity
        user.setFullName(fullName);
        user.setMobileNumber(
                normalizeOptionalText(request.getMobileNumber()));

        // Update FarmerProfile entity
        profile.setResidentialAddress(address);
        profile.setVillage(village);
        profile.setDistrict(district);
        profile.setState(state);
        profile.setLandholdingAcres(landholding);
        profile.setSoilClassification(
                normalizeOptionalText(
                        request.getSoilClassification()));

        /*
         * Both entities are managed by the current transaction.
         * JPA dirty checking persists their changes at commit.
         */
        return toResponse(user, profile);
    }

    private User getAuthenticatedFarmer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"));

        if (user.getRole() == null
                || !"FARMER".equals(user.getRole().name())) {

            throw new AccessDeniedException(
                    "Only farmers can access this profile");
        }

        return user;
    }

    private FarmerProfileResponse toResponse(
            User user,
            FarmerProfile profile) {

        return new FarmerProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getMobileNumber(),
                profile.getResidentialAddress(),
                profile.getVillage(),
                profile.getDistrict(),
                profile.getState(),
                profile.getLandholdingAcres(),
                profile.getSoilClassification()
        );
    }

    private String requireText(String value, String fieldName) {

        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(
                    fieldName + " is required");
        }

        return value.trim();
    }

    private String normalizeOptionalText(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}