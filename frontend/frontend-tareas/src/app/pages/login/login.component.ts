import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import { LoginDTO } from '../../services/AuthService.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: LoginDTO = {
    username: '',
    password: ''
  };

  loading = false;
  errorMessage = '';
  showError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.showError = true;

    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;

        if (response.exito) {
          // Guardar datos de usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify({
            id: response.id,
            username: response.username,
            tipoUsuario: response.tipoUsuario,
            usuarioId: response.usuarioId
          }));

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userType', response.tipoUsuario);

          // Redirigir al dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.mensaje || 'Credenciales incorrectas';
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);

        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas';
        } else if (error.status === 0) {
          this.errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté ejecutándose.';
        } else {
          this.errorMessage = 'Error en el servidor. Por favor intenta más tarde.';
        }
      }
    });
  }

  // Método para rellenar credenciales de prueba
  fillDemoCredentials(tipo: 'estudiante' | 'docente') {
    if (tipo === 'estudiante') {
      this.credentials.username = 'juanperez';
      this.credentials.password = 'contraseña_encriptada';
    } else {
      this.credentials.username = 'carlosgomez';
      this.credentials.password = 'contraseña_encriptada';
    }
    this.showError = false;
    this.errorMessage = '';
  }
}
