import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  rateProduct(data: { productId: number; rate: string }) {
    return this.http.post<any>(`${this.API}/products/rate`, data);
  }

  searchProductByName(query: string) {
    return this.http.get<any>(`${this.API}/products/search/${query}`);
  }

  deleteGivenRating(data: { productId: number; id: number }) {
    return this.http.post<any>(`${this.API}/products/unrate`, data);
  }
}
