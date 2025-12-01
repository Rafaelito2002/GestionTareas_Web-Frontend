import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
