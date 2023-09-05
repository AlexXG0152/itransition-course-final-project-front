import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReview } from '../interfaces/review.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  createReview(data: IReview) {
    return this.http.post<IReview>(
      `${this.API}/reviews`,
      data,
      this.httpOptions
    );
  }

  getAllReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.API}/reviews`, this.httpOptions);
  }

  getReviewByID(id: number): Observable<IReview> {
    return this.http.get<IReview>(
      `${this.API}/reviews/${id}`,
      this.httpOptions
    );
  }

  getReviewsByParams(
    quantity: number,
    offset: number,
    orderBy: string,
    direction: 'ASC' | 'DESC'
  ): Observable<{ count: number; rows: IReview[] }> {
    return this.http.get<{ count: number; rows: IReview[] }>(
      `${this.API}/reviews/list?quantity=${quantity}&offset=${offset}&order=${orderBy}&direction=${direction}`,
      this.httpOptions
    );
  }

  editReview(id: string, data: IReview): Observable<IReview> {
    return this.http.patch<IReview>(
      `${this.API}/reviews/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteReview(id: string) {
    return this.http.delete<IReview>(
      `${this.API}/reviews/${id}`,
      this.httpOptions
    );
  }
}
