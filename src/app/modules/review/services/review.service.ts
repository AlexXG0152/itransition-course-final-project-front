import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReview } from '../interfaces/review.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  API = environment.API;

  createReview(data: IReview) {
    return this.http.post<IReview>(`${this.API}/reviews`, data);
  }

  getAllReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.API}/reviews`);
  }

  getReviewByID(id: number): Observable<IReview> {
    return this.http.get<IReview>(`${this.API}/reviews/${id}`);
  }

  getReviewsByParams(
    quantity: number,
    offset: number,
    orderBy: string,
    direction: 'ASC' | 'DESC'
  ): Observable<{ count: number; rows: IReview[] }> {
    return this.http.get<{ count: number; rows: IReview[] }>(
      `${this.API}/reviews/list?quantity=${quantity}&offset=${offset}&order=${orderBy}&direction=${direction}`
    );
  }

  getReviewsByTag(
    tagId: number,
    quantity: number,
    offset: number,
    orderBy: string,
    direction: 'ASC' | 'DESC'
  ): Observable<{ count: number; rows: IReview[] }> {
    return this.http.get<{ count: number; rows: IReview[] }>(
      `${this.API}/reviews/tags?tagId=${tagId}&quantity=${quantity}&offset=${offset}&order=${orderBy}&direction=${direction}`
    );
  }

  editReview(id: string, data: IReview): Observable<IReview> {
    return this.http.patch<IReview>(`${this.API}/reviews/${id}`, data);
  }

  deleteReview(id: string) {
    return this.http.delete<IReview>(`${this.API}/reviews/${id}`);
  }
}
