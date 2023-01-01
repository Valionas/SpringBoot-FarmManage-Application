import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Food } from '../models/food';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  public foods: Food[] | undefined;
  public displayedFoods: Food[] | undefined;
  public editFood: Food | undefined;
  public deleteFood: Food | undefined;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.getFoods();
  }

  public getFoods(): void {
    this.foodService.getFoods().subscribe(
      (response: Food[]) => {
        this.foods = response;
        this.displayedFoods = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddFood(addForm: NgForm): void {
    document.getElementById('add-food-form')!.click();
    this.foodService.addFood(addForm.value).subscribe(
      (response: Food) => {
        this.getFoods();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateFood(food: Food): void {
    document.getElementById('edit-food-form')!.click();
    this.foodService.updateFood(food).subscribe(
      (response: Food) => {
        this.getFoods();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onDeleteFood(foodId: number): void {
    document.getElementById('edit-food-form')!.click();
    this.foodService.deleteFood(foodId).subscribe(
      (response: void) => {
        this.getFoods();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public searchFoods(key: string): void {
    const results: Food[] = [];
    if (this.foods) {
      for (const food of this.foods) {
        if (food.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(food);
        }
      }
      this.displayedFoods = results
      if (!key) {
        this.displayedFoods = this.foods;
      }
    }
  }

  public onOpenModal(animal: Food | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch (mode) {
      case "add":
        button.setAttribute('data-target', '#addFoodModal');
        break;
      case "edit":
        this.editFood = animal;
        button.setAttribute('data-target', '#updateFoodModal');
        break;
      case "delete":
        this.deleteFood = animal;
        button.setAttribute('data-target', '#deleteFoodModal');
        break;
      default:
        break;
    }
    container?.appendChild(button);
    button.click();
  }
}
