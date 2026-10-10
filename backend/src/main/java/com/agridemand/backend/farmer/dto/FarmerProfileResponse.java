package com.agridemand.backend.farmer.dto;

import java.math.BigDecimal;

public class FarmerProfileResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String mobileNumber;

    private String residentialAddress;
    private String village;
    private String district;
    private String state;
    private Double landholdingAcres;
    private String soilClassification;

    public FarmerProfileResponse() {
    }

    public FarmerProfileResponse(
            Long userId,
            String fullName,
            String email,
            String mobileNumber,
            String residentialAddress,
            String village,
            String district,
            String state,
            Double landholdingAcres,
            String soilClassification) {

        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.residentialAddress = residentialAddress;
        this.village = village;
        this.district = district;
        this.state = state;
        this.landholdingAcres = landholdingAcres;
        this.soilClassification = soilClassification;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getResidentialAddress() {
        return residentialAddress;
    }

    public void setResidentialAddress(String residentialAddress) {
        this.residentialAddress = residentialAddress;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Double getLandholdingAcres() {
        return landholdingAcres;
    }

    public void setLandholdingAcres(Double landholdingAcres) {
        this.landholdingAcres = landholdingAcres;
    }

    public String getSoilClassification() {
        return soilClassification;
    }

    public void setSoilClassification(String soilClassification) {
        this.soilClassification = soilClassification;
    }
}
