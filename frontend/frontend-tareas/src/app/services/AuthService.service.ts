import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  tipoUsuario: string;
  usuarioId: number;
  mensaje: string;
  exito: boolean;
}

export interface ValidacionResponse {
  valido: boolean;
}

export interface UsuarioDTO {
  id?: number;
  username: string;
  password: string;
  tipoUsuario: string;
  usuarioId: number;
}

export interface CurrentUser {
  id: number;
  username: string;
  tipoUsuario: string;
  usuarioId: number;
  token?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
  }


  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  get userType(): string {
    const user = this.currentUserValue;
    return user ? user.tipoUsuario : '';
  }

  login(credentials: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          if (response.exito) {
            const user = {
              id: response.id,
              username: response.username,
              tipoUsuario: response.tipoUsuario,
              usuarioId: response.usuarioId
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return response;
        })
      );
  }

  validateCredentials(username: string, password: string): Observable<{ valido: boolean }> {
    return this.http.get<{ valido: boolean }>(
      `${this.apiUrl}/validar?username=${username}&password=${password}`
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    this.currentUserSubject.next(null);
  }

  getUserInfo() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isEstudiante(): boolean {
    return this.userType?.toLowerCase() === 'estudiante';
  }

  isDocente(): boolean {
    return this.userType?.toLowerCase() === 'docente';
  }
}
