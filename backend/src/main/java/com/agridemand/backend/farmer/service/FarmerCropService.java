package com.agridemand.backend.farmer.service;

import com.agridemand.backend.farmer.dto.FarmerCropRequest;
import com.agridemand.backend.farmer.dto.FarmerCropResponse;
import com.agridemand.backend.farmer.entity.FarmerCrop;
import com.agridemand.backend.farmer.repository.FarmerCropRepository;
import com.agridemand.backend.user.entity.User;
import com.agridemand.backend.user.enums.Role;
import com.agridemand.backend.user.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FarmerCropService {

    private final FarmerCropRepository farmerCropRepository;
    private final UserRepository userRepository;

    public FarmerCropService(
            FarmerCropRepository farmerCropRepository,
            UserRepository userRepository) {

        this.farmerCropRepository = farmerCropRepository;
        this.userRepository = userRepository;
    }

    private User getFarmer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"
                        ));

        if (user.getRole() != Role.FARMER) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only farmers can manage crops"
            );
        }

        return user;
    }

    @Transactional(readOnly = true)
    public List<FarmerCropResponse> getMyCrops(String email) {

        User farmer = getFarmer(email);

        return farmerCropRepository
                .findByFarmerId(farmer.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public FarmerCropResponse addCrop(
            String email,
            FarmerCropRequest request) {

        User farmer = getFarmer(email);

        validateCrop(request);

        FarmerCrop crop = new FarmerCrop();

        crop.setFarmer(farmer);

        applyRequest(crop, request);

        return toResponse(farmerCropRepository.save(crop));
    }

    @Transactional
    public FarmerCropResponse updateCrop(
            String email,
            Long cropId,
            FarmerCropRequest request) {

        User farmer = getFarmer(email);

        validateCrop(request);

        FarmerCrop crop = farmerCropRepository
                .findByIdAndFarmerId(cropId, farmer.getId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Crop not found"
                        ));

        applyRequest(crop, request);

        return toResponse(farmerCropRepository.save(crop));
    }

    @Transactional
    public void deleteCrop(String email, Long cropId) {

        User farmer = getFarmer(email);

        FarmerCrop crop = farmerCropRepository
                .findByIdAndFarmerId(cropId, farmer.getId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Crop not found"
                        ));

        farmerCropRepository.delete(crop);
    }

    private void validateCrop(FarmerCropRequest request) {

        if (request.getName() == null
                || request.getName().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Crop name is required"
            );
        }

        if (request.getVariety() == null
                || request.getVariety().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Crop variety is required"
            );
        }

        if (!List.of("Kharif", "Rabi", "Zaid")
                .contains(request.getSeason())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid growing season"
            );
        }

        if (!List.of(
                "Sowing",
                "Vegetative",
                "Flowering",
                "Harvesting"
        ).contains(request.getStage())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid crop stage"
            );
        }

        if (request.getLandArea() == null
                || !Double.isFinite(request.getLandArea())
                || request.getLandArea() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Land area must be greater than zero"
            );
        }

        if (request.getSowingDate() == null
                || request.getExpectedHarvest() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Sowing and expected harvest dates are required"
            );
        }

        if (request.getExpectedHarvest()
                .isBefore(request.getSowingDate())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Expected harvest date cannot be before sowing date"
            );
        }

        if (!List.of("Excellent", "Good", "Average", "Poor")
                .contains(request.getHealth())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid crop health"
            );
        }
    }

    private void applyRequest(
            FarmerCrop crop,
            FarmerCropRequest request) {

        crop.setCropName(request.getName().trim());
        crop.setSeedVariety(request.getVariety().trim());
        crop.setSeason(request.getSeason());
        crop.setCropStage(request.getStage());
        crop.setFarmAreaAcres(request.getLandArea());
        crop.setPlantingDate(request.getSowingDate());
        crop.setExpectedHarvestDate(request.getExpectedHarvest());
        crop.setHealth(request.getHealth());
    }

    private FarmerCropResponse toResponse(FarmerCrop crop) {

        return new FarmerCropResponse(
                crop.getId(),
                crop.getCropName(),
                crop.getSeedVariety(),
                crop.getSeason(),
                crop.getCropStage(),
                crop.getFarmAreaAcres(),
                crop.getPlantingDate(),
                crop.getExpectedHarvestDate(),
                crop.getHealth()
        );
    }
}