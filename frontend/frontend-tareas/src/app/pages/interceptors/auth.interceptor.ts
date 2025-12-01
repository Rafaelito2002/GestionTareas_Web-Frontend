import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/AuthService.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Si tuvieras tokens JWT, aquí los agregarías
    // Por ahora solo verificamos si el usuario está logueado
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // Si en el futuro agregas tokens, los pones aquí:
      // request = request.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${currentUser.token}`
      //   }
      // });
    }

    return next.handle(request);
  }
}
