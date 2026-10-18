package com.lavidastitch.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/** A T-shirt or starter kit. Table: products (plus small tables for gallery, colors and sizes). */
@Entity
@Table(name = "products")
public class Product {

    @Id
    private String id; // readable id such as "essential-black-tee"

    private String name;
    private int price;
    private String category; // T-Shirts, Oversized, Starter Kits

    /** Image keys. The React app turns a key into the real image file. */
    private String image;
    private String modelImage;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_gallery", joinColumns = @JoinColumn(name = "product_id"))
    @OrderColumn(name = "idx")
    @Column(name = "image_key")
    private List<String> gallery = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id"))
    @OrderColumn(name = "idx")
    @Column(name = "color_name")
    private List<String> colors = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name = "product_id"))
    @OrderColumn(name = "idx")
    @Column(name = "size_label")
    private List<String> sizes = new ArrayList<>();

    private double rating;
    private int reviews;
    private String includedPatchId;

    @Column(length = 1000)
    private String description;
    private String material;
    @Column(length = 500)
    private String care;
    @Column(length = 500)
    private String patchCompatible;

    /** Keeps the products in the same order as the seed file. */
    private int sortOrder;

    public Product() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getModelImage() { return modelImage; }
    public void setModelImage(String modelImage) { this.modelImage = modelImage; }
    public List<String> getGallery() { return gallery; }
    public void setGallery(List<String> gallery) { this.gallery = gallery; }
    public List<String> getColors() { return colors; }
    public void setColors(List<String> colors) { this.colors = colors; }
    public List<String> getSizes() { return sizes; }
    public void setSizes(List<String> sizes) { this.sizes = sizes; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public int getReviews() { return reviews; }
    public void setReviews(int reviews) { this.reviews = reviews; }
    public String getIncludedPatchId() { return includedPatchId; }
    public void setIncludedPatchId(String includedPatchId) { this.includedPatchId = includedPatchId; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    public String getCare() { return care; }
    public void setCare(String care) { this.care = care; }
    public String getPatchCompatible() { return patchCompatible; }
    public void setPatchCompatible(String patchCompatible) { this.patchCompatible = patchCompatible; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
