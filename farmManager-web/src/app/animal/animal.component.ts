import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Animal } from '../models/animal';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  public animals: Animal[] | undefined;
  public editAnimal: Animal | undefined;
  public deleteAnimal: Animal | undefined;
  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.getAnimals();
  }

  public getAnimals(): void {
    this.animalService.getAnimals().subscribe(
      (response: Animal[]) => {
        this.animals = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddAnimal(addForm: NgForm): void {
    document.getElementById('add-animal-form')!.click();
    this.animalService.addAnimal(addForm.value).subscribe(
      (response: Animal) => {
        this.getAnimals();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateAnimal(animal: Animal): void {
    document.getElementById('edit-animal-form')!.click();
    this.animalService.updateAnimal(animal).subscribe(
      (response: Animal) => {
        this.getAnimals();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onDeleteAnimal(animalId: number): void {
    document.getElementById('edit-animal-form')!.click();
    this.animalService.deleteAnimal(animalId).subscribe(
      (response: void) => {
        this.getAnimals();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public searchAnimals(key: string): void {
    const results: Animal[] = [];
    if (this.animals) {
      for (const animal of this.animals) {
        if (animal.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          animal.category.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          animal.animalType.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          animal.foodType.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
          results.push(animal);
        }
      }
      this.animals = results
      if (results.length === 0 || !key) {
        this.getAnimals()
      }
    }

  }

  public onOpenModal(animal: Animal | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch (mode) {
      case "add":
        button.setAttribute('data-target', '#addAnimalModal');
        break;
      case "edit":
        this.editAnimal = animal;
        button.setAttribute('data-target', '#updateAnimalModal');
        break;
      case "delete":
        this.deleteAnimal = animal;
        button.setAttribute('data-target', '#deleteAnimalModal');
        break;
      default:
        break;
    }
    container?.appendChild(button);
    button.click();
  }
}
