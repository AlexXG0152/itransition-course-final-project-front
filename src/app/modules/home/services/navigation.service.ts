import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/icategory.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  categories: any[] = [];

  getAllNavigationPoints() {
    return this.http
      .get<ICategory[]>(`${this.API}/products/category/all`, this.httpOptions)
      .subscribe((i) => this.categories.push(...i));
  }
}
