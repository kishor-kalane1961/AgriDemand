package com.agridemand.backend.farmer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FarmerCropResponse {

    private Long id;

    private String name;

    private String variety;

    private String season;

    private String stage;

    private Double landArea;

    private LocalDate sowingDate;

    private LocalDate expectedHarvest;

    private String health;
}