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
}
