import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  public getUser(): any {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      return true;
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
