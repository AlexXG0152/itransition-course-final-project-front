import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../interfaces/review.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-previews-list',
  templateUrl: './review-previews-list.component.html',
  styleUrls: ['./review-previews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewPreviewsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef
  ) {}

  page = 1;
  collectionSize = 0;

  tagId?: number;
  quantity = 10;
  offset = 0;
  orderBy = 'createdAt';
  direction: 'ASC' | 'DESC' = 'ASC';
  categoryId?: number;
  subcategoryId?: number;

  reviews?: IReview[];
  likesArray: boolean[] = [];
  showLikeButton: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.tagId = params['tagId'];
      this.quantity = params['quantity'];
      this.offset = params['offset'];
      this.orderBy = params['orderBy'];
      this.direction = params['direction'];
      this.categoryId = params['categoryId'];
      this.subcategoryId = params['subcategoryId'];

      this.loadData();
    });
  }

  loadData() {
    if (this.tagId) {
      this.loadTagsReviews();
    } else if (this.subcategoryId) {
      this.loadSubCategoryIdReviews();
    } else if (this.categoryId) {
      this.loadCategoryIdReviews();
    } else {
      this.loadTopOrLatestReviews();
    }
  }

  loadTopOrLatestReviews() {
    this.reviewService
      .getReviewsByParams(
        this.quantity,
        this.offset,
        this.orderBy,
        this.direction
      )
      .subscribe((response) => {
        this.processReviewsResponse(response);
      });
  }

  loadTagsReviews() {
    this.reviewService
      .getReviewsByTag(
        this.tagId!,
        this.quantity,
        this.offset,
        this.orderBy,
        this.direction
      )
      .subscribe((response) => {
        this.processReviewsResponse(response);
      });
  }

  loadCategoryIdReviews() {
    this.reviewService
      .getReviewsByParams(
        this.quantity,
        this.offset,
        this.orderBy,
        this.direction,
        this.categoryId
      )
      .subscribe((response) => {
        this.processReviewsResponse(response);
      });
  }

  loadSubCategoryIdReviews() {
    this.reviewService
      .getReviewsByParams(
        this.quantity,
        this.offset,
        this.orderBy,
        this.direction,
        this.categoryId,
        this.subcategoryId
      )
      .subscribe((response) => {
        this.processReviewsResponse(response);
      });
  }

  processReviewsResponse(response: any) {
    response.rows?.map((review: any) => {
      review.imageslinks = JSON.parse(review.imageslinks);
    });

    this.reviews = response?.rows;

    if (response.count === 0) {
      this.router.navigateByUrl('/404');
    }

    this.collectionSize = response.count;
    this.reviewService.getLikesForPreview(this.reviews, this.likesArray);
    this.cdr.detectChanges();
  }

  pageChanged(page: any) {
    this.offset = page * 10 - 10;
    this.loadData();
  }
}
