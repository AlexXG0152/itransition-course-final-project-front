import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../interfaces/review.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-previews-list',
  templateUrl: './review-previews-list.component.html',
  styleUrls: ['./review-previews-list.component.scss'],
})
export class ReviewPreviewsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  page = 1;
  collectionSize = 0;

  quantity: number = 10;
  offset: number = 0;
  orderBy: string = 'createdAt';
  direction: 'ASC' | 'DESC' = 'ASC';

  reviews?: IReview[];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quantity = params['quantity'];
      this.offset = params['offset'];
      this.orderBy = params['orderBy'];
      this.direction = params['direction'];
    });

    this.loadReviews(this.quantity, this.offset, this.orderBy, this.direction);
  }

  loadReviews(
    quantity: number,
    offset: number,
    orderBy: string,
    direction: 'ASC' | 'DESC'
  ) {
    this.reviewService
      .getReviewsByParams(quantity, offset, orderBy, direction)
      .subscribe((response) => {
        response.rows.map(
          (review) => (review.imageslinks = JSON.parse(review.imageslinks))
        );
        this.reviews = response.rows;
        this.collectionSize = response.count;
      });
  }

  pageChanged(page: any) {
    this.loadReviews(10, page * 10 - 10, this.orderBy, this.direction);
  }
}
