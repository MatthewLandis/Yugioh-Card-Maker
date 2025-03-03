import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  registerInfo = { username: '', email: '', password: '' };

  private apiUrl = 'http://localhost:5000/api/auth/register';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    if (this.registerInfo) {
      this.http.post<{ id: number, username: string }>(this.apiUrl, {
        username: this.registerInfo.username,
        email: this.registerInfo.email,
        password: this.registerInfo.password
      }).subscribe({
        next: (response) => {
          localStorage.setItem('ID', response.id.toString());
          localStorage.setItem('USERNAME', response.username);
          console.log(localStorage.getItem('USERNAME'));

          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
      });
    } else {
      window.alert('Fill out all fields!');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
