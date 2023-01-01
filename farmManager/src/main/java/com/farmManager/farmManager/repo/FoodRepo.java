package com.farmManager.farmManager.repo;

import com.farmManager.farmManager.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodRepo extends JpaRepository<Food, Long> {
    Optional<Food> findFoodById(Long id);
}
