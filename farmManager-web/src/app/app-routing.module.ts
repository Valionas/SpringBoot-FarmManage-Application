import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './animal/animal.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { FoodComponent } from './food/food.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: AnimalComponent,
    canActivate: [AuthGuard],
    data: {
      authenticated: true,
      onFailRedirect: '/login',
    }
  },
  {
    path: "login",
    component: LoginUserComponent,
    canActivate: [AuthGuard],
    data: {
      authenticated: false,
      onFailRedirect: '/home',

    }
  },
  {
    path: "register",
    component: RegisterUserComponent,
    canActivate: [AuthGuard],
    data: {
      authenticated: false,
      onFailRedirect: '/home',
    }
  },
  {
    path: "food",
    component: FoodComponent,
    canActivate: [AuthGuard],
    data: {
      authenticated: true,
      onFailRedirect: '/login',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
