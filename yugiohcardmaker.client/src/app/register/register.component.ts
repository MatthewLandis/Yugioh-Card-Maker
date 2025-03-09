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
    if (this.registerInfo.username != '' || this.registerInfo.email != '' || this.registerInfo.password != '') {
      this.http.post<{ id: number, username: string }>(this.apiUrl, this.registerInfo
                      // i want this, hehehe, (above)               this be what ima send, yar
      ).subscribe({ //server respobds wiith next
        next: (response) => {
          localStorage.setItem('ID', response.id.toString());
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
