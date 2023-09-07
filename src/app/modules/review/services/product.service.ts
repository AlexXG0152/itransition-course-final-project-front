import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  // getAllCategories() {
  //   return this.http.get<any[]>(
  //     `${this.API}/products/subcategory/all`,
  //   );
  // }
}
