import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  searchTags(searchQuery: string) {
    return this.http.get<string[]>(
      `${this.API}/reviews/searchTags/${searchQuery}`
    );
  }
  getPopularTags() {
    return this.http.get<any[]>(
      `${this.API}/reviews/searchTags/getPopularTags`
    );
  }
}
