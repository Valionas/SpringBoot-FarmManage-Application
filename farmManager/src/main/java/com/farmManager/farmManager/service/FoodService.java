package com.farmManager.farmManager.service;

import com.farmManager.farmManager.exception.FoodNotFoundException;
import com.farmManager.farmManager.model.Food;
import com.farmManager.farmManager.repo.FoodRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodRepo foodRepo;

    @Autowired
    public FoodService(FoodRepo foodRepo){ this.foodRepo = foodRepo ;}

    public Food addFood(Food food){
        return foodRepo.save(food);
    }

    public List<Food> findAllFoods(){return foodRepo.findAll() ;}

    public Food updateFood(Food food){ return foodRepo.save(food) ;}

    public Food findFoodById(Long id){
        return foodRepo.findFoodById(id).orElseThrow(() -> new FoodNotFoundException(("Food was not found with id: "+ id)));
    }

    public void deleteFood(Long id){
        foodRepo.deleteById(id);
    }
}
