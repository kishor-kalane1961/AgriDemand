package com.agridemand.backend.shop.dto;

public class ShopProfileResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String mobileNumber;

    private String shopName;
    private String shopAddress;
    private String city;
    private String district;
    private String state;
    private String dealerLicenseNumber;
    private String gstin;
    private String verificationStatus;

    public ShopProfileResponse() {
    }

    public ShopProfileResponse(
            Long userId,
            String fullName,
            String email,
            String mobileNumber,
            String shopName,
            String shopAddress,
            String city,
            String district,
            String state,
            String dealerLicenseNumber,
            String gstin,
            String verificationStatus) {

        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.shopName = shopName;
        this.shopAddress = shopAddress;
        this.city = city;
        this.district = district;
        this.state = state;
        this.dealerLicenseNumber = dealerLicenseNumber;
        this.gstin = gstin;
        this.verificationStatus = verificationStatus;
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

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopAddress() {
        return shopAddress;
    }

    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
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

    public String getDealerLicenseNumber() {
        return dealerLicenseNumber;
    }

    public void setDealerLicenseNumber(String dealerLicenseNumber) {
        this.dealerLicenseNumber = dealerLicenseNumber;
    }

    public String getGstin() {
        return gstin;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }
}
