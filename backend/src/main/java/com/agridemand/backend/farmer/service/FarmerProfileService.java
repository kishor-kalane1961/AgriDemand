package com.agridemand.backend.farmer.service;

import com.agridemand.backend.farmer.dto.FarmerProfileResponse;
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

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        if (!"FARMER".equals(user.getRole().name())) {
            throw new AccessDeniedException(
                    "Only farmers can access this profile");
        }

        FarmerProfile profile = farmerProfileRepository
                .findByUserId(user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Farmer profile not found"));

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
}
