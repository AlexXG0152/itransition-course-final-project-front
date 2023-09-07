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

  ngOnInit(): void {
    this.reviewService
      .getReviewsByParams(10, 0, 'reviewRating', 'DESC')
      .subscribe((response) => {
        this.parseJSON(response);
        this.topTenReviews = response.rows;
        this.topTenReviews.name = 'Top 10';
        console.log(this.topTenReviews);
      });

    this.reviewService
      .getReviewsByParams(10, 0, 'createdAt', 'DESC')
      .subscribe((response) => {
        this.parseJSON(response);

        this.latestTenReviews = response.rows;
        this.latestTenReviews.name = 'Latest 10';
        console.log(this.latestTenReviews);
      });
  }

  parseJSON(response: { count?: number; rows: any }) {
    return response.rows.map(
      (review: { imageslinks: string }) =>
        (review.imageslinks = JSON.parse(review.imageslinks))
    );
  }
}
