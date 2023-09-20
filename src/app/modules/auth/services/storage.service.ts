import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_KEY = environment.USER_KEY;
  private A_TOKEN = environment.A_TOKEN;

  public clean(): void {
    window.localStorage.removeItem(this.USER_KEY);
    window.sessionStorage.removeItem(this.USER_KEY);
    window.localStorage.removeItem(this.A_TOKEN);
    window.sessionStorage.removeItem(this.A_TOKEN);
  }

  public saveUser(user: string): void {
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, user);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.A_TOKEN);
    window.localStorage.setItem(this.A_TOKEN, token);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      return user;
    }
    return {};
  }
}
