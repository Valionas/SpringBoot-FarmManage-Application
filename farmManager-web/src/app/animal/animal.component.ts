import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from '../models/animal';
import { Food } from '../models/food';
import { AnimalService } from '../services/animal.service';
import { FoodService } from '../services/food.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  public animals: Animal[] | undefined;
  public foods: Food[] | undefined;
  public displayedAnimals: Animal[] | undefined;
  public editAnimal: Animal | undefined;
  public deleteAnimal: Animal | undefined;

  constructor(private router: Router, private animalService: AnimalService, private userService: UserService, private foodService: FoodService) { }

  ngOnInit(): void {
    this.getAnimals();
    this.getFoods();
  }

  public getAnimals(): void {
    this.animalService.getAnimals().subscribe(
      (response: Animal[]) => {
        this.animals = response;
        this.displayedAnimals = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getFoods(): void {
    this.foodService.getFoods().subscribe(
      (response: Food[]) => {
        this.foods = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddAnimal(addForm: NgForm): void {
    document.getElementById('add-animal-form')!.click();
    addForm.value.hunger = 0;
    addForm.value.thirst = 0;
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
      this.displayedAnimals = results
      if (!key) {
        this.displayedAnimals = this.animals;
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
      case "giveFood":
        if (animal!.hunger < 3) {
          this.editAnimal = animal;
          button.setAttribute('data-target', '#feedAnimalModal');
        } else {
          alert(`${animal!.name} is already full on food`)
        }

        break;
      default:
        break;
    }
    container?.appendChild(button);
    button.click();
  }

  public onWaterAnimal(animal: Animal) {
    if (animal.thirst < 5) {
      animal.thirst += 1;
      this.animalService.updateAnimal(animal).subscribe(
        (response: Animal) => {
          this.getAnimals();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    } else {
      alert(`${animal.name} is full on water.`)
    }
  }

  public onFeedAnimal(animal: Animal, foodFormValue: any) {
    document.getElementById('feed-animal-form')!.click();
    if (animal.hunger < 3) {
      animal.hunger += 1;
      let updatedFood = this.foods?.find(food => food.id === Number(foodFormValue.food));
      updatedFood!.quantity -= 1;
      console.log(updatedFood);
      this.animalService.updateAnimal(animal).subscribe(
        (response: Animal) => {
          this.getAnimals();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );

      this.foodService.updateFood(updatedFood!).subscribe(
        (response: Food) => {
          this.getFoods();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
    } else {
      alert(`${animal.name} is full on food.`)
    }
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
