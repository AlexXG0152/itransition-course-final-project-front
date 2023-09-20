import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { tap, catchError } from 'rxjs';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  constructor(private reviewService: ReviewService) {}

  @Input() liked?: boolean;
  @Input() reviewId?: number;
  @Output() increaseLikeCounter = new EventEmitter<string>();

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
          this.increaseLikeCounter.emit('+1')
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
