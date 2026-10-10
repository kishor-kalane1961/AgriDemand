package com.agridemand.backend.shop.controller;

import com.agridemand.backend.shop.dto.ShopRegistrationRequest;
import com.agridemand.backend.shop.service.ShopRegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/shop")
public class ShopRegistrationController {

    private final ShopRegistrationService shopRegistrationService;

    public ShopRegistrationController(
            ShopRegistrationService shopRegistrationService) {
        this.shopRegistrationService = shopRegistrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerShop(
            @Valid @RequestBody ShopRegistrationRequest request) {

        shopRegistrationService.registerShop(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Shop registered successfully. Awaiting verification.");
    }
}