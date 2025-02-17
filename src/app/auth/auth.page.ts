import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRouterOutlet, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

enum AuthTitles{
  Login = 'Inicia sesión',
  Register = 'Registrate',
  Auth = 'Autenticación'
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [ RouterModule ,IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonContent, CommonModule, FormsModule, IonCard, IonRouterOutlet]
})
export default class AuthPage implements OnInit {
  private router = inject(Router);

  public title = signal<AuthTitles>(AuthTitles.Auth);
  public showRegisterButton = computed( () => this.title() === AuthTitles.Login );

  ngOnInit() {
    this.updateTitle();
  }

  updateTitle(): void{
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('/').pop();
        if (currentRoute === 'login') {
          this.title.set(AuthTitles.Login);
        } else if (currentRoute === 'register') {
          this.title.set(AuthTitles.Register);
        } else {
          this.title.set(AuthTitles.Auth);
        }
      }
    });
  }

  

}
