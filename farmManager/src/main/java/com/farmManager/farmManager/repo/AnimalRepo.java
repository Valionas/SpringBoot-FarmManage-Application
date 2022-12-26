package com.farmManager.farmManager.repo;

import com.farmManager.farmManager.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnimalRepo extends JpaRepository<Animal, Long> {
    Optional<Animal> findAnimalById(Long id);
}
