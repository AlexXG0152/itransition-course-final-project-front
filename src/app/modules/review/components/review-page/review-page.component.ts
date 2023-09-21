import { Component, OnInit } from '@angular/core';
import { IReview } from '../../interfaces/review.interface';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { IUser } from 'src/app/modules/user/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { StorageService } from 'src/app/modules/auth/services/storage.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
})
export class ReviewPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  user?: IUser;
  review?: IReview;

  isLoggedIn = false;
  loginStatus$?: Subscription;

  showLikeButton: boolean = false;
  liked?: boolean;

  loaded: boolean = false;

  ngOnInit(): void {
    const reviewId = +this.route.snapshot.params['id'];
    this.getReview(reviewId);

    this.loginStatus$ = this.authService.getLoginStatus().subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn();

      if (+this.storageService.getUser()) {
        this.reviewService
          .isLiked(reviewId, +this.storageService.getUser())
          .subscribe((response) => {
            this.liked = response;
            this.showLikeButton = true;
          });
      }
    });
  }

  getReview(reviewId: number): void {
    this.reviewService.getReviewByID(reviewId).subscribe((review: IReview) => {
      this.review = review;
      if (this.review) {
        this.review.imageslinks = JSON.parse(this.review.imageslinks);
        this.loaded = true;
      }
    });
  }

  increaseLikeCounter(event: string) {
    this.review!.like = this.review?.like! + 1;
  }
}
