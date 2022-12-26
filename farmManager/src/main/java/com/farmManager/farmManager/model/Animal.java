package com.farmManager.farmManager.model;

import jakarta.persistence.*;

import java.io.Serializable;


@Entity
public class Animal implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String category;
    private String animalType;
    private String foodType;
    private Integer age;
    private String imageUrl;

    public Animal() {}

    public Animal(String name, String category, String animalType, String foodType, Integer age, String imageUrl){
        this.name = name;
        this.category = category;
        this.animalType = animalType;
        this.foodType = foodType;
        this.age = age;
        this.imageUrl = imageUrl;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String getAnimalType(){
        return animalType;
    }

    public void setAnimalType(String animalType){
        this.animalType = animalType;
    }

    public String getFoodType() { return foodType;}

    public void setFoodType(String foodType){ this.foodType = foodType; }

    public Integer getAge() { return age ;}

    public void setAge(Integer age) { this.age = age;}

    public String getImageUrl() { return imageUrl;}

    public void setImageUrl(String imageUrl){ this.imageUrl = imageUrl; }

}
