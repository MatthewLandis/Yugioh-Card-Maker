import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginInfo = { username: '', email: '', password: '' };
  
  private apiUrl = 'http://localhost:5000/api/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    if (this.loginInfo) {
      this.http.post<{ id: number, username: string }>(this.apiUrl, {
        username: this.loginInfo.username,
        email: this.loginInfo.email,
        password: this.loginInfo.password
        }).subscribe({
          next: (response) => {
            localStorage.setItem('ID', response.toString());
            localStorage.setItem('username', response.username);

            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          },
        });
    } else {
      window.alert('Fill out all fields!');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
