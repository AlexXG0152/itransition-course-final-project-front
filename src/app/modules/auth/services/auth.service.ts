import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthReq } from '../interfaces/auth-req.interface';
import { IAuthRes } from '../interfaces/auth-res.interface';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { IUser } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  API = environment.API;
  userState: any;

  registration(data: IAuthReq) {
    return this.http.post<IAuthRes>(`${this.API}/auth/registration`, data);
  }

  login(data: IAuthReq) {
    return this.http.post<IAuthRes>(`${this.API}/auth/login`, data);
  }

  logout() {
    this.storageService.clean();
  }

  public isLoggedIn() {
    const token = window.localStorage.getItem('a_token');
    if (token) {
      const decoded: IUser = jwt_decode(token);
      const isLoggedIn = +decoded.exp! > +Date.now().toString().slice(0, 10);
      if (isLoggedIn) {
        return true
        // return this.loginStatusChange(true);
      } else {
        this.storageService.clean();
        return false;
        // return this.loginStatusChange(false);
      }
    }
    return false;
  }

  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  loginStatusChange(result: boolean): void {
    this.loginStatus.next(result);
  }
}
