import { Component, OnInit } from '@angular/core';
import { IReview } from '../../interfaces/review.interface';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { IUser } from 'src/app/modules/user/interfaces/user.interface';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
})
export class ReviewPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private userService: UserService
  ) {}

  user?: IUser;
  review?: IReview;

  showLikeButton: boolean = false;
  liked?: boolean;

  loaded: boolean = false;

  ngOnInit(): void {
    const reviewId = this.route.snapshot.params['id'];
    this.getReview(reviewId);
    // setTimeout(() => {
    this.user = this.userService.getCurrentUser();
    this.liked = this.user?.likes?.some(
      (like: { reviewId: number }) => like.reviewId === +reviewId
    );
    this.showLikeButton = true;

    // }, 100);
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
}
