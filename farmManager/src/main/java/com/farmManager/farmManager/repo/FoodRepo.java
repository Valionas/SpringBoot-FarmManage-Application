package com.farmManager.farmManager.repo;

import com.farmManager.farmManager.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepo extends JpaRepository<Food, Long> {

}
