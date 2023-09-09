import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../interfaces/review.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-review-previews-list',
  templateUrl: './review-previews-list.component.html',
  styleUrls: ['./review-previews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewPreviewsListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  page = 1;
  collectionSize = 0;

  tagId?: number;
  quantity = 10;
  offset = 0;
  orderBy = 'createdAt';
  direction: 'ASC' | 'DESC' = 'ASC';

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

  processReviewsResponse(response: any) {
    response.rows.map(
      (review: { imageslinks: string }) =>
        (review.imageslinks = JSON.parse(review.imageslinks))
    );
    this.reviews = response.rows;
    this.collectionSize = response.count;
    this.getLikes();
    this.cdr.detectChanges();
  }

  pageChanged(page: any) {
    this.offset = page * 10 - 10;
    this.loadData();
  }

  getLikes() {
    const userLikes = this.userService.getCurrentUser().likes!;

    this.reviews?.forEach((rew) => {
      this.likesArray!.push(userLikes.some((like) => like.reviewId === rew.id));
    });
    this.showLikeButton = true;
  }
}
