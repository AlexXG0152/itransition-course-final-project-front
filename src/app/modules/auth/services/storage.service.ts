import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_KEY = environment.USER_KEY;

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
      return user;
    }
    return {};
  }
}
