package com.lavidastitch.model;

import jakarta.persistence.*;

/** A detachable 20 x 20 cm velcro patch. Table: patches */
@Entity
@Table(name = "patches")
public class Patch {

    @Id
    private String id; // for example "fuji"

    private String name;
    @Column(length = 300)
    private String tagline;
    private String image; // image key
    private int price;
    private String category; // Graphic, Nature, Travel, Typography, Minimal
    private String tone; // main colour of the artwork
    private int sortOrder;

    public Patch() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
