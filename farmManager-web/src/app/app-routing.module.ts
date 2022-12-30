import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './animal/animal.component';
import { FoodComponent } from './food/food.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: AnimalComponent
  },
  {
    path: "food",
    component: FoodComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
