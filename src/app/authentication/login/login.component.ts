import { LoginRequest } from '../../shared/interfaces/login-request';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  LoginRequest: LoginRequest = new LoginRequest();

  constructor(private authService: AuthService, private router: Router) { }

  onlogin(): void {
    this.LoginRequest.email = this.email;
    this.LoginRequest.password = this.password;
    this.authService.login(this.LoginRequest).subscribe({
      next: response => {
        this.authService.handleLoginResponse(response);
        this.router.navigate(['/']); // Navigate to home
      },
      error: error => {
        console.error('Invalid username or password', error);
        // Handle error
      }
    });
  }

  ngOnInit(): void {
  }

}
