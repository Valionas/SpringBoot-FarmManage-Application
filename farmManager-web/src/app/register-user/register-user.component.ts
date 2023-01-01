import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  public onRegisterUser(addForm: NgForm): void {
    const registerData = { ...addForm.value };
    if (registerData.password === registerData.confirmPassword) {
      this.userService.registerUser(addForm.value).subscribe(
        (response: User) => {
          this.userService.isLoggedIn = true;
          localStorage.setItem('user', response.username);
          this.router.navigate(['/home']);
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      )
    } else {
      alert("Passwords do not match!");
    }

  }
}
