import { Component, computed, effect, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonLoading } from '@ionic/angular/standalone';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces/auth-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonLoading],
})
export default class AppComponent {
  private router      = inject(Router);
  private authService = inject(AuthService);

  public finishedAuthCheck = computed<boolean>(() =>  {
    return this.authService.authStatus() !== AuthStatus.checking;
  });

  public authStatusChangedEffect = effect( () => {
    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/tasks');
        return;
    }
  });
}
