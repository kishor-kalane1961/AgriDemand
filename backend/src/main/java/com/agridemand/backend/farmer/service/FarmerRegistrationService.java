package com.agridemand.backend.farmer.service;

import com.agridemand.backend.farmer.dto.FarmerRegistrationRequest;
import com.agridemand.backend.farmer.entity.FarmerProfile;
import com.agridemand.backend.farmer.repository.FarmerProfileRepository;
import com.agridemand.backend.user.entity.User;
import com.agridemand.backend.user.enums.Role;
import com.agridemand.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FarmerRegistrationService {

    private final UserRepository userRepository;
    private final FarmerProfileRepository farmerProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public FarmerRegistrationService(
            UserRepository userRepository,
            FarmerProfileRepository farmerProfileRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.farmerProfileRepository = farmerProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void registerFarmer(FarmerRegistrationRequest request) {

        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new IllegalArgumentException(
                    "Email is already registered");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException(
                    "Passwords do not match");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setMobileNumber(request.getMobileNumber().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.FARMER);
        user.setEnabled(true);

        userRepository.save(user);

        FarmerProfile profile = new FarmerProfile();
        profile.setUser(user);
        profile.setResidentialAddress(
                request.getResidentialAddress().trim());
        profile.setVillage(request.getVillage().trim());
        profile.setDistrict(request.getDistrict().trim());
        profile.setState(request.getState().trim());
        profile.setLandholdingAcres(request.getLandholdingAcres());
        profile.setSoilClassification(
                request.getSoilClassification());

        farmerProfileRepository.save(profile);
    }
}
