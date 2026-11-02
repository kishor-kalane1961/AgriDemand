package com.agridemand.backend.farmer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class FarmerCropRequest {

    private String name;

    private String variety;

    private String season;

    private String stage;

    private Double landArea;

    private LocalDate sowingDate;

    private LocalDate expectedHarvest;

    private String health;
}