package com.agridemand.backend.farmer.dto;

public class FarmerProfileUpdateRequest {

    private String fullName;
    private String mobileNumber;

    private String residentialAddress;
    private String village;
    private String district;
    private String state;

    private Double landholdingAcres;
    private String soilClassification;

    public FarmerProfileUpdateRequest() {
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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