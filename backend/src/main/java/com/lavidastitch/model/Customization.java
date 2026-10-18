package com.lavidastitch.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/** A tee design saved from the Customize page. Table: customizations */
@Entity
@Table(name = "customizations")
public class Customization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail; // empty when the visitor is not logged in
    private String baseColor;
    private String fabric;
    private String patchIds; // comma separated
    private String size;
    private int price;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Customization() {}

    public Long getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getBaseColor() { return baseColor; }
    public void setBaseColor(String baseColor) { this.baseColor = baseColor; }
    public String getFabric() { return fabric; }
    public void setFabric(String fabric) { this.fabric = fabric; }
    public String getPatchIds() { return patchIds; }
    public void setPatchIds(String patchIds) { this.patchIds = patchIds; }
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
