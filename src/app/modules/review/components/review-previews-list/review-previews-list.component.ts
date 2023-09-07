// import { Component, OnInit } from '@angular/core';
// import { ReviewService } from '../../services/review.service';
// import { IReview } from '../../interfaces/review.interface';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-review-previews-list',
//   templateUrl: './review-previews-list.component.html',
//   styleUrls: ['./review-previews-list.component.scss'],
// })
// export class ReviewPreviewsListComponent implements OnInit {
//   constructor(
//     private route: ActivatedRoute,
//     private reviewService: ReviewService
//   ) {}

//   page = 1;
//   collectionSize = 0;

//   tagId?: number;
//   quantity: number = 10;
//   offset: number = 0;
//   orderBy: string = 'createdAt';
//   direction: 'ASC' | 'DESC' = 'ASC';

//   reviews?: IReview[];

//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params) => {
//       this.tagId = params['tagId'];
//       this.quantity = params['quantity'];
//       this.offset = params['offset'];
//       this.orderBy = params['orderBy'];
//       this.direction = params['direction'];
//     });

//     if (this.tagId) {
//       this.loadTagsReviews(
//         this.tagId,
//         this.quantity,
//         this.offset,
//         this.orderBy,
//         this.direction
//       );
//     } else {
//       this.loadTopOrLatestReviews(
//         this.quantity,
//         this.offset,
//         this.orderBy,
//         this.direction
//       );
//     }
//   }

//   loadTopOrLatestReviews(
//     quantity: number,
//     offset: number,
//     orderBy: string,
//     direction: 'ASC' | 'DESC'
//   ) {
//     this.reviewService
//       .getReviewsByParams(quantity, offset, orderBy, direction)
//       .subscribe((response) => {
//         response.rows.map(
//           (review) => (review.imageslinks = JSON.parse(review.imageslinks))
//         );
//         this.reviews = response.rows;
//         this.collectionSize = response.count;
//       });
//   }

//   loadTagsReviews(
//     tagId: number,
//     quantity: number,
//     offset: number,
//     orderBy: string,
//     direction: 'ASC' | 'DESC'
//   ) {
//     this.reviewService
//       .getReviewsByTag(tagId, quantity, offset, orderBy, direction)
//       .subscribe((response) => {
//         response.rows.map(
//           (review) => (review.imageslinks = JSON.parse(review.imageslinks))
//         );
//         this.reviews = response.rows;
//         this.collectionSize = response.count;
//       });
//   }

//   pageChanged(page: any) {
//     if (this.tagId) {
//       this.loadTagsReviews(
//         this.tagId,
//         10,
//         page * 10 - 10,
//         this.orderBy,
//         this.direction
//       );
//     } else {
//       this.loadTopOrLatestReviews(
//         10,
//         page * 10 - 10,
//         this.orderBy,
//         this.direction
//       );
//     }
//   }
// }
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../interfaces/review.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-previews-list',
  templateUrl: './review-previews-list.component.html',
  styleUrls: ['./review-previews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Использование стратегии OnPush
})
export class ReviewPreviewsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef // Инжектирование ChangeDetectorRef
  ) {}

  page = 1;
  collectionSize = 0;

  tagId?: number;
  quantity = 10;
  offset = 0;
  orderBy = 'createdAt';
  direction: 'ASC' | 'DESC' = 'ASC';

  reviews?: IReview[];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.tagId = params['tagId'];
      this.quantity = params['quantity'];
      this.offset = params['offset'];
      this.orderBy = params['orderBy'];
      this.direction = params['direction'];

      this.loadData();
    });
  }

  loadData() {
    if (this.tagId) {
      this.loadTagsReviews();
    } else {
      this.loadTopOrLatestReviews();
    }
  }

  loadTopOrLatestReviews() {
    this.reviewService
      .getReviewsByParams(this.quantity, this.offset, this.orderBy, this.direction)
      .subscribe((response) => {
        this.processReviewsResponse(response);
      });
  }

  loadTagsReviews() {
    this.reviewService
      .getReviewsByTag(this.tagId!, this.quantity, this.offset, this.orderBy, this.direction)
      .subscribe((response) => {
        this.processReviewsResponse(response);
      });
  }

  processReviewsResponse(response: any) {
    response.rows.map(
      (review: { imageslinks: string; }) => (review.imageslinks = JSON.parse(review.imageslinks))
    );
    this.reviews = response.rows;
    this.collectionSize = response.count;
    this.cdr.detectChanges();
  }

  pageChanged(page: any) {
    this.offset = page * 10 - 10;
    this.loadData();
  }
}
