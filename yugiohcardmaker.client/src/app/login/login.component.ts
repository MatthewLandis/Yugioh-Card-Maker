import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private apiUrl = 'http://localhost:5000/api/auth/login'; // Update based on your backend URL

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    if (this.email && this.password) {
      this.http.post<any>(this.apiUrl, { email: this.email, password: this.password })
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token); // Store JWT token (if used)
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.errorMessage = error.error.message || 'Login failed!';
          }
        });
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}

