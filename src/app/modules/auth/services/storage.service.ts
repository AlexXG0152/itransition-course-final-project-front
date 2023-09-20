import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private USER_ID = environment.USER_ID;
  private A_TOKEN = environment.A_TOKEN;

  public clean(): void {
    window.localStorage.removeItem(this.USER_ID);
    window.sessionStorage.removeItem(this.USER_ID);
    window.localStorage.removeItem(this.A_TOKEN);
    window.sessionStorage.removeItem(this.A_TOKEN);
  }

  public saveUser(userId: number): void {
    window.localStorage.removeItem(this.USER_ID);
    window.localStorage.setItem(this.USER_ID, `${userId}`);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.A_TOKEN);
    window.localStorage.setItem(this.A_TOKEN, token);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(this.USER_ID);
    if (user) {
      return user;
    }
    return {};
  }
}
