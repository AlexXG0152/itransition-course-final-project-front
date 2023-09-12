import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAuthReq } from '../interfaces/auth-req.interface';
import { IAuthRes } from '../interfaces/auth-res.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  API = environment.API;

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('access-control-allow-origin', 'http://localhost:4200')
    .set('access-control-allow-credentials', 'true');

  login(data: IAuthReq) {
    return this.http.post<IAuthRes>(`${this.API}/auth/login`, data, {
      headers: this.headers,
    });
  }

  registration(data: IAuthReq) {
    return this.http.post<IAuthRes>(`${this.API}/auth/registration`, data, {
      headers: this.headers,
    });
  }

  logout() {
    this.storageService.clean();
  }

  loginWithFacebook() {
    return this.http.get<any>(`${this.API}/auth/facebook`);
  }

  loginWithGoogle() {
    return this.http.get<any>(`${this.API}/auth/google`, {
      headers: this.headers,
    });
  }
}
