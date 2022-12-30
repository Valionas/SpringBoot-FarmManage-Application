import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Animal } from './models/animal';
import { AnimalService } from './services/animal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  public onOpenModal(animal: Animal | null, mode: string): void {
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
        button.setAttribute('data-target', '#updateAnimalModal');
        break;
      case "delete":
        button.setAttribute('data-target', '#deleteAnimalModal');
        break;
      default:
        break;
    }
    container?.appendChild(button);
    button.click();
  }
}
