import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/icategory';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  AllNavigationPoints: ICategory[] = [];

  getAllNavigationPoints() {
    return this.http
      .get<ICategory[]>(`${this.API}/products/category/all`, this.httpOptions)
      .subscribe((i) => this.AllNavigationPoints.push(...i));
  }
}
