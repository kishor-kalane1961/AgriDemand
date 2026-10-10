package com.agridemand.backend.farmer.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FarmerRegistrationRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 100)
    private String fullName;

    @NotBlank(message = "Email is required")
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

    @NotBlank(message = "Residential address is required")
    @Size(max = 255)
    private String residentialAddress;

    @NotBlank(message = "Village or city is required")
    @Size(max = 100)
    private String village;

    @NotBlank(message = "District is required")
    @Size(max = 100)
    private String district;

    @NotBlank(message = "State is required")
    @Size(max = 100)
    private String state;

    @NotNull(message = "Landholding is required")
    @DecimalMin(value = "0.01",
            message = "Landholding must be greater than zero")
    private Double landholdingAcres;

    @Size(max = 100)
    private String soilClassification;
}
