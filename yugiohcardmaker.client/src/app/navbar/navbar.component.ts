import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('ID');
    this.username = localStorage.getItem('USERNAME');
    console.log(localStorage.getItem('USERNAME'));

    console.log("🔹 Username from localStorage:", this.username);
  }

  logout() {
    localStorage.removeItem('ID');
    localStorage.removeItem('USERNAME');

    this.isLoggedIn = false;
    this.username = null;

  }
}
