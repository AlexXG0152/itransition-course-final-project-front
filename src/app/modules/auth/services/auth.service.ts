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

  registration(data: IAuthReq) {
    return this.http.post<IAuthRes>(`${this.API}/auth/registration`, data);
  }

  login(data: IAuthReq) {
    return this.http.post<IAuthRes>(`${this.API}/auth/login`, data);
  }

  logout() {
    this.storageService.clean();
  }
}
