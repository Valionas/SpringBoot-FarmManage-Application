import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public registerUser(user: User): Observable<void> {
        return this.http.post<void>(`${this.apiServerUrl}/user/register`, user);
    }
    public loginUser(user: User): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiServerUrl}/user/login`, user);
    }

}