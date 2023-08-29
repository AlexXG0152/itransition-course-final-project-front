import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_KEY = environment.USER_KEY;

  constructor() {}

  public clean(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveUser(user: string): void {
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, user);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(token);
    window.localStorage.setItem('a_token', token);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const token = window.localStorage.getItem('a_token');
    if (token) {
      const decoded: IUser = jwt_decode(token);

      return Number(decoded.iat!.toString().slice(0, 10)) < Date.now();
    }
    return false;
  }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  loginStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  loginStatusChange(result: boolean): void {
    this.loggedIn.next(result);
  }
}
