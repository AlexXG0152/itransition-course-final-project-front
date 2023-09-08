import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.showAdminBoardSubject = new BehaviorSubject<boolean>(false);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  API = environment.API;

  private currentUserSubject?: BehaviorSubject<IUser>;
  public showAdminBoardSubject?: BehaviorSubject<boolean>;
  public currentUser$?: Observable<IUser>;

  getUserInfo() {
    return this.http.get<IUser>(`${this.API}/users/0/me`);
  }

  getMyInfo() {
    return this.http.get<IUser>(`${this.API}/users/0/me`).subscribe((user) => {
      this.setCurrentUser(user);
      user.roles!.map((data: any) => {
        if (data.value === 'ADMIN') {
          this.setAdminBoard(true);
        }
      });
    });
  }

  getCurrentUser(): IUser {
    return this.currentUserSubject!.value;
  }

  setCurrentUser(user: IUser): void {
    this.currentUserSubject!.next(user);
  }

  getAdminBoard(): boolean {
    return this.showAdminBoardSubject!.value;
  }

  setAdminBoard(value: boolean): void {
    this.showAdminBoardSubject!.next(value);
  }
}
