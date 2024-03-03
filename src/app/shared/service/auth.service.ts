import { LoginRequest } from './../interfaces/login-request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { SignupRequest } from '../interfaces/signup-request';
import { Route, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authServiceBaseURL = this.sharedService.getBaseUrl();
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    private userIdKey = 'userId';

    constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

    login(loginRequest: LoginRequest): Observable<any> {
        // Send login request to backend API
        return this.http.post<any>(`${this.authServiceBaseURL}/users/login`, JSON.stringify(loginRequest));
    }

    handleLoginResponse(response: any): void {
        // Check if login was successful based on the response
        if (response.token) {
            // Emit true to indicate successful authentication
            this.isAuthenticatedSubject.next(true);
            // Optionally, perform any additional actions (e.g., store user data or tokens)
        } else {
            // Handle unsuccessful login (e.g., show error message)
        }
    }

    signup(userInfo: SignupRequest): Observable<any> {
        return this.http.post<any>(`${this.authServiceBaseURL}/users/signup`, JSON.stringify(userInfo));
    }

    logout(): void {
        // Logic for logout...
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): boolean {
        if (localStorage.getItem('token') && localStorage.getItem(this.userIdKey)) {
            this.isAuthenticatedSubject.next(true)
        }
        return this.isAuthenticatedSubject.value;
    }

    getUserId(): string | null {
        return localStorage.getItem(this.userIdKey);
    }

}