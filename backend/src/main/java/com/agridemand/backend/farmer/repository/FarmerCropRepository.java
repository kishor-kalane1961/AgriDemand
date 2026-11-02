package com.agridemand.backend.farmer.repository;

import com.agridemand.backend.farmer.entity.FarmerCrop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FarmerCropRepository
        extends JpaRepository<FarmerCrop, Long> {

    List<FarmerCrop> findByFarmerId(Long farmerId);

    Optional<FarmerCrop> findByIdAndFarmerId(
            Long id,
            Long farmerId
    );
}