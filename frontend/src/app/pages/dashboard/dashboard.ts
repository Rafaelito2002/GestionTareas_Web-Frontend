import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  user: any = null;

  ngOnInit(){
    const data = localStorage.getItem('user');
    if(data) this.user = JSON.parse(data);
  }
}
