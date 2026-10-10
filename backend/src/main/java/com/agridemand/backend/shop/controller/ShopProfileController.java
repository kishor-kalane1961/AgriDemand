package com.agridemand.backend.shop.controller;

import com.agridemand.backend.shop.dto.ShopProfileResponse;
import com.agridemand.backend.shop.service.ShopProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shop")
public class ShopProfileController {

    private final ShopProfileService shopProfileService;

    public ShopProfileController(ShopProfileService shopProfileService) {
        this.shopProfileService = shopProfileService;
    }

    @GetMapping("/me")
    public ShopProfileResponse getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();

        return shopProfileService.getMyProfile(email);
    }
}
