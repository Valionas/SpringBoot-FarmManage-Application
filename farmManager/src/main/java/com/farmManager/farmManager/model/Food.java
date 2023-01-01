package com.farmManager.farmManager.model;

import jakarta.persistence.*;

@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String name;
    private Double quantity;
    private String imageUrl;

    public Food() {}

    public Food(String name, Double quantity, String imageUrl){
        this.name = name;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id;}

    public void setId(Long id) { this.id = id;}

    public String getName() { return name;}

    public void setName(String name) { this.name = name;}

    public Double getQuantity() { return quantity;}

    public void setQuantity(Double quantity){ this.quantity = quantity;}

    public String getImageUrl() { return imageUrl;}

    public void setImageUrl(String imageUrl){ this.imageUrl = imageUrl;}
}
