
package com.agridemand.backend.shop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ShopRegistrationRequest {

    @NotBlank(message = "Owner name is required")
    @Size(max = 100)
    private String fullName;

    @NotBlank(message = "Shop name is required")
    @Size(max = 150)
    private String shopName;

    @NotBlank(message = "Business email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 150)
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Size(max = 20)
    private String mobileNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 72)
    private String password;

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    @NotBlank(message = "Shop address is required")
    @Size(max = 255)
    private String shopAddress;

    @NotBlank(message = "City or Taluka is required")
    @Size(max = 100)
    private String city;

    @NotBlank(message = "District is required")
    @Size(max = 100)
    private String district;

    @NotBlank(message = "State is required")
    @Size(max = 100)
    private String state;

    @NotBlank(message = "Dealer license number is required")
    @Size(max = 100)
    private String dealerLicenseNumber;

    @Pattern(
            regexp = "^[0-9A-Za-z]{15}$",
            message = "GSTIN must contain 15 alphanumeric characters"
    )
    private String gstin;

    public ShopRegistrationRequest() {
    }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }

    public String getShopAddress() { return shopAddress; }
    public void setShopAddress(String shopAddress) { this.shopAddress = shopAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDealerLicenseNumber() { return dealerLicenseNumber; }
    public void setDealerLicenseNumber(String dealerLicenseNumber) { this.dealerLicenseNumber = dealerLicenseNumber; }

    public String getGstin() { return gstin; }
    public void setGstin(String gstin) { this.gstin = gstin; }
}
