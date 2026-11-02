package com.agridemand.backend.farmer.controller;

import com.agridemand.backend.farmer.dto.FarmerCropRequest;
import com.agridemand.backend.farmer.dto.FarmerCropResponse;
import com.agridemand.backend.farmer.service.FarmerCropService;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer/crops")
public class FarmerCropController {

    private final FarmerCropService farmerCropService;

    public FarmerCropController(
            FarmerCropService farmerCropService) {
        this.farmerCropService = farmerCropService;
    }

    @GetMapping
    public List<FarmerCropResponse> getMyCrops(
            Authentication authentication) {

        return farmerCropService.getMyCrops(
                authentication.getName()
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FarmerCropResponse addCrop(
            Authentication authentication,
            @RequestBody FarmerCropRequest request) {

        return farmerCropService.addCrop(
                authentication.getName(),
                request
        );
    }

    @PutMapping("/{id}")
    public FarmerCropResponse updateCrop(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody FarmerCropRequest request) {

        return farmerCropService.updateCrop(
                authentication.getName(),
                id,
                request
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCrop(
            Authentication authentication,
            @PathVariable Long id) {

        farmerCropService.deleteCrop(
                authentication.getName(),
                id
        );
    }
}