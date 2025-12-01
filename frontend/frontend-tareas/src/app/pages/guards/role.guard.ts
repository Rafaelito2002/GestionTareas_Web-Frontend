import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    const userType = currentUser.tipoUsuario?.toLowerCase();

    if (userType !== expectedRole) {
      // Usuario no autorizado, redirigir al dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
