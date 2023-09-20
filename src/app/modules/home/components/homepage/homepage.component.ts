import { Component, OnInit } from '@angular/core';
import { IReview } from 'src/app/modules/review/interfaces/review.interface';
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
  showLikeButton?: boolean;
  loading: boolean = true;

  async ngOnInit(): Promise<void> {
    try {
      const [topTenResponse, latestTenResponse]: any = await Promise.all([
        this.reviewService
          .getReviewsByParams(10, 0, 'reviewRating', 'DESC')
          .toPromise(),
        this.reviewService
          .getReviewsByParams(10, 0, 'createdAt', 'DESC')
          .toPromise(),
      ]);
      this.parseJSON(topTenResponse);
      this.parseJSON(latestTenResponse);
      this.topTenReviews = topTenResponse?.rows;
      this.topTenReviews.name = 'Top 10';
      this.latestTenReviews = latestTenResponse?.rows;
      this.latestTenReviews.name = 'Latest 10';
      this.reviewService.getLikesForPreview(
        this.topTenReviews,
        this.topTenReviewsLikesArray
      );
      this.reviewService.getLikesForPreview(
        this.latestTenReviews,
        this.latestTenReviewsLikesArray
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.showLikeButton = true;
      this.loading = false;
    }
  }

  parseJSON(response: { count?: number; rows?: any }) {
    return response.rows?.map((review: any) => {
      review.imageslinks = JSON.parse(review.imageslinks);
    });
  }
}
