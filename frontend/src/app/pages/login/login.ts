import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    this.api.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'usuario o contraseña incorrectos';
      }
    });
  }
}