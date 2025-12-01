import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // Verificar si la ruta requiere un tipo de usuario específico
      const expectedRole = route.data['expectedRole'];

      if (expectedRole) {
        const userType = currentUser.tipoUsuario?.toLowerCase();
        if (userType !== expectedRole) {
          // Redirigir al dashboard si no tiene el rol adecuado
          this.router.navigate(['/dashboard']);
          return false;
        }
      }

      return true;
    }

    // No está logueado, redirigir al login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
