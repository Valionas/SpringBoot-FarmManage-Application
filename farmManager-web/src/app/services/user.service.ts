import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    isLoggedIn = localStorage.getItem("user") != null ? true : false;

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public registerUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/user/register`, user,);
    }
    public loginUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/user/login`, user);
    }

    public logout() {
        this.isLoggedIn = false;
        localStorage.clear();
    }

}