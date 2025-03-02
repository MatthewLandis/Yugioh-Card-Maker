import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  private apiUrl = 'http://localhost:5000/api/auth/register';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    if (this.username && this.email && this.password) {
      this.http.post<number>(this.apiUrl, {
        username: this.username,
        email: this.email,
        password: this.password
      }).subscribe({
        next: (number) => {
          console.log("Registration successful");
          localStorage.setItem('ID', number.toString());
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
