import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReview } from '../interfaces/review.interface';
import { Observable } from 'rxjs';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient, private userService: UserService) {}

  API = environment.API;

  createReview(data: IReview): Observable<IReview> {
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
    direction: 'ASC' | 'DESC',
    categoryId?: number
  ): Observable<{ count: number; rows: IReview[] }> {
    if (categoryId !== undefined) {
      return this.http.get<{ count: number; rows: IReview[] }>(
        `${this.API}/reviews/list?quantity=${quantity}&offset=${offset}&order=${orderBy}&direction=${direction}&categoryId=${categoryId}`
      );
    }

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

  editReview(id: number, data: IReview): Observable<IReview> {
    return this.http.patch<IReview>(`${this.API}/reviews/${id}`, data);
  }

  deleteReview(id: number): Observable<IReview> {
    return this.http.delete<IReview>(`${this.API}/reviews/${id}`);
  }

  likeReview(id: number): Observable<IReview> {
    return this.http.get<IReview>(`${this.API}/reviews/${id}/like`);
  }

  isLiked(id: number, userId: number): Observable<boolean> {
    return this.http.get<any>(`${this.API}/reviews/${id}/isLiked/${userId}`);
  }

  getLikesForPreview(reviews: any, likesArray: any): void {
    const userLikes = this.userService.getCurrentUser();

    if (userLikes?.likes) {
      reviews?.forEach((rew: { id: number }) => {
        likesArray.push(
          userLikes.likes?.some((like) => like.reviewId === rew.id)
        );
      });
    }
    return;
  }
}
