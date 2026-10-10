package com.agridemand.backend.farmer.controller;

import com.agridemand.backend.farmer.dto.FarmerRegistrationRequest;
import com.agridemand.backend.farmer.service.FarmerRegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/farmer")
public class FarmerRegistrationController {

    private final FarmerRegistrationService farmerRegistrationService;

    public FarmerRegistrationController(
            FarmerRegistrationService farmerRegistrationService) {
        this.farmerRegistrationService = farmerRegistrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerFarmer(
            @Valid @RequestBody FarmerRegistrationRequest request) {

        farmerRegistrationService.registerFarmer(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Farmer registered successfully.");
    }
}