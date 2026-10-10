package com.agridemand.backend.farmer.controller;

import com.agridemand.backend.farmer.dto.FarmerProfileResponse;
import com.agridemand.backend.farmer.service.FarmerProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/farmer")
public class FarmerProfileController {

    private final FarmerProfileService farmerProfileService;

    public FarmerProfileController(
            FarmerProfileService farmerProfileService) {
        this.farmerProfileService = farmerProfileService;
    }

    @GetMapping("/me")
    public FarmerProfileResponse getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();

        return farmerProfileService.getMyProfile(email);
    }
}
