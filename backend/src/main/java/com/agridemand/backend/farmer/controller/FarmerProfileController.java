package com.agridemand.backend.farmer.controller;

import com.agridemand.backend.farmer.dto.FarmerProfileResponse;
import com.agridemand.backend.farmer.dto.FarmerProfileUpdateRequest;
import com.agridemand.backend.farmer.service.FarmerProfileService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/farmer")
public class FarmerProfileController {

    private final FarmerProfileService farmerProfileService;

    public FarmerProfileController(
            FarmerProfileService farmerProfileService) {
        this.farmerProfileService = farmerProfileService;
    }

    // Retrieve the authenticated farmer's profile
    @GetMapping("/me")
    public FarmerProfileResponse getMyProfile(
            Authentication authentication) {

        return farmerProfileService.getMyProfile(
                authentication.getName()
        );
    }

    // Update the authenticated farmer's profile
    @PutMapping("/me")
    public FarmerProfileResponse updateMyProfile(
            Authentication authentication,
            @RequestBody FarmerProfileUpdateRequest request) {

        return farmerProfileService.updateMyProfile(
                authentication.getName(),
                request
        );
    }
}