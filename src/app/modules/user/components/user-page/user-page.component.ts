import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { IColumns } from '../../interfaces/columns.interface';

export const columns: IColumns = {
  reviews: [
    'id',
    'title',
    'product-category',
    'review-rating',
    'like',
    'product-title',
    'create',
    'actions',
  ],
  ratings: ['id', 'product-id', 'product-title', 'rate', 'create', 'actions'],
  comments: [
    'id',
    'review-id',
    'comment-title',
    'comment-text',
    'product-title',
    'create',
    'actions',
  ],
  likes: ['id', 'review-id', 'product-title', 'create', 'actions'],
};

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  user!: IUser;

  ready = false;
  selectedTab: any;
  data: any;
  tabs = ['reviews', 'ratings', 'comments', 'likes'];

  selectedTabChange($event: any) {
    // this.selectedTab = $event.tab.textLabel.toLowerCase();
    this.selectedTab = this.tabs[$event.index];

    this.data = {
      rows: this.user[this.tabs[$event.index] as keyof IUser],
      columns: columns[this.tabs[$event.index] as keyof IColumns],
    };
  }

  ngOnInit(): void {
    this.getInputData();
  }

  getInputData() {
    this.userService.getUserInfo().subscribe((response) => {
      this.user = response;
      this.addFields();
      this.user = JSON.parse(
        JSON.stringify(this.user)
          .replaceAll('productTitle', 'product-title')
          .replaceAll('createdAt', 'create')
          .replaceAll('commentTitle', 'comment-title')
          .replaceAll('commentText', 'comment-text')
          .replaceAll('category', 'product-category')
          .replaceAll('reviewId', 'review-id')
          .replaceAll('productId', 'product-id')
          .replaceAll('reviewRating', 'review-rating')
      );

      this.data = {
        rows: this.user.reviews,
        columns: columns.reviews,
      };
      this.ready = true;
    });
  }

  addFields(): void {
    const reviewMap: { [id: string]: any } = {};

    this.user.reviews!.forEach((review: any) => {
      reviewMap[review.id] = review;
    });

    this.user.ratings!.forEach((rating: any) => {
      const review: any = reviewMap[rating.productId];
      rating.productTitle = review?.productTitle;
    });

    this.user.comments!.forEach((comment: any) => {
      const review: any = reviewMap[comment.reviewId];
      comment.productTitle = review?.title;
    });

    this.user.likes!.forEach((like: any) => {
      const review: any = reviewMap[like.reviewId];
      like.productTitle = review?.title;
    });
  }
}
