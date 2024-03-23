import { LoginRequest } from './../interfaces/login-request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { SignupRequest } from '../interfaces/signup-request';
import { Route, Router } from '@angular/router';
import { SelectedUserAccountService } from './selected-account-service';
import { User } from '../interfaces/user-info';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authServiceBaseURL = this.sharedService.getBaseUrl();
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private sharedService: SharedService, private router: Router, private userAccountService: SelectedUserAccountService) { }

    login(loginRequest: LoginRequest): Observable<any> {
        // Send login request to backend API
        return this.http.post<any>(`${this.authServiceBaseURL}/users/login`, JSON.stringify(loginRequest));
    }

    handleLoginResponse(response: any): void {
        // Check if login was successful based on the response
        if (response.token) {
            const user: User = new User();
            user.userId = response.userInfo.user_id;
            user.email = response.userInfo.email;
            user.phoneNumber = response.userInfo.phone_number;
            user.updatedAt = response.userInfo.updated_at;
            user.createdAt = response.userInfo.created_at;
            this.userAccountService.user = user;
            localStorage.setItem("userID", user.userId);
            this.isAuthenticatedSubject.next(true);
            this.router.navigate(['/']);
        } else {
            // Handle unsuccessful login (e.g., show error message)
        }
    }

    signup(userInfo: SignupRequest): Observable<any> {
        return this.http.post<any>(`${this.authServiceBaseURL}/users/signup`, JSON.stringify(userInfo));
    }

    logout(): void {
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

}