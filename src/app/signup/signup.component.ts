import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../shared/interfaces/signup-request';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  userInfo: SignupRequest = new SignupRequest();
  phoneNumber: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userInfo = new SignupRequest();
  }

  onSignup(): void {
    this.userInfo.name = this.name;
    this.userInfo.email = this.email;
    this.userInfo.password = this.password;
    this.userInfo.phone_number = this.phoneNumber;
    this.authService.signup(this.userInfo).subscribe({
      next: response => {
        // Successful login
        // Redirect to home page or navigate to a protected route
        console.log('SignUp successfully:', response);
        this.router.navigate(['/authentication']);
      },
      error: error => {
        console.error('Invalid entry', error);
        // Handle error
      }
    });
  }
}


