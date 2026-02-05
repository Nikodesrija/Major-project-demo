package com.example.logistics.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "driver_behavior")
public class DriverBehavior {

    @Id
    @Column(name = "driver_id")
    private int driverId;

    @Column(name = "total_deliveries")
    private int totalDeliveries;

    @Column(name = "cancellations")
    private int cancellations;

    @Column(name = "gps_anomalies")
    private int gpsAnomalies;

    @Column(name = "risk_score")
    private double riskScore;

    @Column(name = "anomaly_score")
    private Double anomalyScore;

    @Column(name = "flagged")
    private boolean flagged;

    @Column(name = "risk_level")
    private String riskLevel;
   
     @Column(name = "blocked")
    private boolean blocked;
     @Column(name = "admin_justification")
    private String adminJustification;
    // Default constructor
    public DriverBehavior() {
    }

    // Constructor with driverId
    public DriverBehavior(int driverId) {
        this.driverId = driverId;
        this.totalDeliveries = 0;
        this.cancellations = 0;
        this.gpsAnomalies = 0;
        this.riskScore = 0.0;
        this.anomalyScore = 0.0;
        this.flagged = false;
        this.riskLevel = "LOW";
        this.blocked = false;
        this.adminJustification = null;
    }

    // Getters and Setters
    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }

    public int getTotalDeliveries() {
        return totalDeliveries;
    }

    public void setTotalDeliveries(int totalDeliveries) {
        this.totalDeliveries = totalDeliveries;
    }

    public int getCancellations() {
        return cancellations;
    }

    public void setCancellations(int cancellations) {
        this.cancellations = cancellations;
    }

    public int getGpsAnomalies() {
        return gpsAnomalies;
    }

    public void setGpsAnomalies(int gpsAnomalies) {
        this.gpsAnomalies = gpsAnomalies;
    }

    public double getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(double riskScore) {
        this.riskScore = riskScore;
    }

    public double getAnomalyScore() {
        return anomalyScore;
    }

    public void setAnomalyScore(double anomalyScore) {
        this.anomalyScore = anomalyScore;
    }

    public boolean isFlagged() {
        return flagged;
    }

    public void setFlagged(boolean flagged) {
        this.flagged = flagged;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
     public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }
     public String getAdminJustification() {
        return adminJustification;
    }

    public void setAdminJustification(String adminJustification) {
        this.adminJustification = adminJustification;
    }
}
