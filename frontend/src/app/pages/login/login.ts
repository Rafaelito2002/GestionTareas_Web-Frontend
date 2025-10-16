import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServise } from '../../services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private api: ApiServise, private router: Router) {}

  onLogin(){
    this.api.login(this.username, this.password).subscribe({
      next:(res:any)=>{
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/dashboard'])
      },
      error: ()=>{
        this.error = 'usuario o contraseñas incorrectos'
      }
    })
  }

}
