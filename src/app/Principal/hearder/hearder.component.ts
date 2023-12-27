import { Component } from '@angular/core';

@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrl: './hearder.component.css'
})
export class HearderComponent {  
  isLoggedIn = false; 
  showLogin = false;
  
  login() {    
    this.isLoggedIn = true;
  }
  
  recibirEstado(estado: boolean) {
    this.isLoggedIn = estado;
    this.showLogin = false;
  }

  // Método para mostrar el login superpuesto
  showLoginOverlay() {
    this.showLogin = true;
  }  
    
}
