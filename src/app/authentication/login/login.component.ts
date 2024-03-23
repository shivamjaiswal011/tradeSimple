import { LoginRequest } from '../../shared/interfaces/login-request';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user-info';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  LoginRequest: LoginRequest = new LoginRequest();
  authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) { }

  onlogin(): void {
    this.LoginRequest.email = this.email;
    this.LoginRequest.password = this.password;
    this.authSubscription = this.authService.login(this.LoginRequest).subscribe({
      next: response => {
        this.authService.handleLoginResponse(response);
      },
      error: error => {
        console.error('Invalid username or password', error);
        // Handle error
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

}
