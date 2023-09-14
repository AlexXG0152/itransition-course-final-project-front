import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/modules/review/services/review.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private reviewService: ReviewService) {}

  topTenReviews: any;
  latestTenReviews: any;

  topTenReviewsLikesArray: boolean[] = [];
  latestTenReviewsLikesArray: boolean[] = [];
  showLikeButton: any;

  ngOnInit(): void {
    this.reviewService
      .getReviewsByParams(10, 0, 'reviewRating', 'DESC')
      .subscribe((response) => {
        this.parseJSON(response);
        this.topTenReviews = response.rows;
        this.topTenReviews.name = 'Top 10';
        this.reviewService.getLikes(
          this.topTenReviews,
          this.topTenReviewsLikesArray
        );
        this.showLikeButton = true;
      });

    this.reviewService
      .getReviewsByParams(10, 0, 'createdAt', 'DESC')
      .subscribe((response) => {
        this.parseJSON(response);
        this.latestTenReviews = response.rows;
        this.latestTenReviews.name = 'Latest 10';
        this.reviewService.getLikes(
          this.latestTenReviews,
          this.latestTenReviewsLikesArray
        );
        this.showLikeButton = true;
      });
  }

  parseJSON(response: { count?: number; rows: any }) {
    return response.rows.map((review: any) => {
        review.imageslinks = JSON.parse(review.imageslinks);
    });
  }
}
