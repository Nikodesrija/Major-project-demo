package com.example.logistics.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

public class GpsRequest {
    @Min(value = 1, message = "Driver ID must be greater than 0")
    private int driverId;
    
    @NotBlank(message = "PLT file path cannot be empty")
    private String pltPath;

    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }

    public String getPltPath() {
        return pltPath;
    }

    public void setPltPath(String pltPath) {
        this.pltPath = pltPath;
    }
}
