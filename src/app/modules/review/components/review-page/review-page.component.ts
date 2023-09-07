import { Component, Input, OnInit } from '@angular/core';
import { IReview } from '../../interfaces/review.interface';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss'],
})
export class ReviewPageComponent implements OnInit {
  review?: IReview;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const reviewId = this.route.snapshot.params['id'];
    this.getReview(reviewId);
  }

  getReview(reviewId: number): void {
    this.reviewService.getReviewByID(reviewId).subscribe((review: IReview) => {
      this.review = review;
      this.review.imageslinks = JSON.parse(this.review.imageslinks);
      this.review.tags = this.review.tags!.map((obj: any) => obj.name);
    });
  }
}
