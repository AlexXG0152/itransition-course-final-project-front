import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { tap, catchError, pipe } from 'rxjs';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  constructor(private reviewService: ReviewService) {}

  @Input() liked?: boolean;
  @Input() reviewId?: number;

  notAuthorized?: boolean;
  error?: boolean;

  shape: string = 'favorite_outline';

  ngOnInit(): void {
    if (this.liked) {
      this.shape = 'favorite';
    }
  }

  onClick() {
    this.reviewService
      .likeReview(this.reviewId!)
      .pipe(
        tap((result) => {
          this.liked = !this.liked;
          this.shape = this.liked ? 'favorite' : 'favorite_outline';
        }),
        catchError((error) => {
          if (error.error.message === 'User not authorized') {
            this.notAuthorized = true;
          } else {
            this.error = true;
          }
          throw error;
        })
      )
      .subscribe();
  }
}
