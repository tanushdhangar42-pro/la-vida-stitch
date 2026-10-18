package com.lavidastitch.model;

import jakarta.persistence.*;

/** A fabric choice. The fabric decides the price of a tee. Table: fabrics */
@Entity
@Table(name = "fabrics")
public class Fabric {

    @Id
    private String id; // for example "premium"

    private String name;
    private String gsm;
    private int price;
    private String description;
    private int sortOrder;

    public Fabric() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGsm() { return gsm; }
    public void setGsm(String gsm) { this.gsm = gsm; }
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
