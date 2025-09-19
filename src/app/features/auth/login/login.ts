import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin' && this.password === 'admin') {
      this.router.navigate(['dashboard']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

}
