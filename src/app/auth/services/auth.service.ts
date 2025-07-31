import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interface';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';
import { RegisterParams } from '../interfaces/register-params.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly baseURL: string = environment.baseURL;

  private readonly http = inject(HttpClient);

  //Signals privadas
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  private updateAuthData({user, token}: LoginResponse | CheckTokenResponse): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  //Signals de solo lectura
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(){
    this.checkAuthStatus().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseURL}/auth/login`;
    const body = {
      email,
      password
    }
    return this.http.post<LoginResponse>(url, body).pipe(
      map((res) => this.updateAuthData(res)),
      catchError(error => throwError(() => error.error.message))
    );
  }

  register({fullName, email, password}: RegisterParams):Observable<boolean>{
    const url = `${this.baseURL}/auth/register`;
    const body = {
      fullName,
      email,
      password
    };
    return this.http.post<LoginResponse>(url, body).pipe(
      map((res) => this.updateAuthData(res)),
      catchError(error => throwError(() => error.error.message))
    );
  }

  logout(): void{
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseURL}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token){
      this.logout();
      return of(false);
    }

    return this.http.get<CheckTokenResponse>(url).pipe(
      map((res) => this.updateAuthData(res)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }
}
