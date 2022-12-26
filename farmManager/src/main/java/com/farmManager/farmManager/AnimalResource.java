package com.farmManager.farmManager;

import com.farmManager.farmManager.model.Animal;
import com.farmManager.farmManager.service.AnimalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animal")
public class AnimalResource {
    private final AnimalService animalService;

    public AnimalResource(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Animal>> getAllAnimals(){
    List<Animal> animals = animalService.findAllAnimals();
    return new ResponseEntity<>(animals, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable("id") Long id){
        Animal animal = animalService.findAnimalById(id);
        return new ResponseEntity<>(animal, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Animal> addAnimal(@RequestBody Animal animal){
        Animal newAnimal = animalService.addAnimal(animal);
        return new ResponseEntity<>(newAnimal, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Animal> updateAnimal(@RequestBody Animal animal){
        Animal updateAnimal = animalService.updateAnimal(animal);
        return new ResponseEntity<>(updateAnimal, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAnimal(@PathVariable("id") Long id){
        animalService.deleteAnimal(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
