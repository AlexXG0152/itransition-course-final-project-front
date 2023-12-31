import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  search(searchQuery: string): Observable<any> {
    return this.http.get(`${this.API}/reviews/search/${searchQuery}`);
  }
}
