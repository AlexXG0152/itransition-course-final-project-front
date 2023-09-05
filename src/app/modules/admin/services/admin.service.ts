import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllUsers() {
    return this.http.get<any>(`${this.API}/users`);
  }

  getAUserById(id: number) {
    return this.http.get<any>(`${this.API}/users/${id}`);
  }
}
