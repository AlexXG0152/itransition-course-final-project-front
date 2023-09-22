import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { IColumns } from '../../interfaces/columns.interface';
import { ActivatedRoute } from '@angular/router';

export const columns: IColumns = {
  reviews: [
    'id',
    'title',
    'review-rating',
    'like',
    'product-title',
    'create',
    // 'actions'
  ],
  ratings: ['product-id', 'product-title', 'rate', 'create'],
  comments: ['review-id', 'comment-text', 'review-title', 'create'],
  likes: ['review-id', 'review-title', 'create'],
};

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  id: number | string = 0;
  user!: IUser;

  ready = false;
  selectedTab: any;
  data: any;
  tabs = ['reviews', 'ratings', 'comments', 'likes'];

  selectedTabChange($event: any) {
    this.selectedTab = this.tabs[$event.index];

    this.data = {
      rows: this.user[this.tabs[$event.index] as keyof IUser],
      columns: columns[this.tabs[$event.index] as keyof IColumns],
    };
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (Number.isNaN(this.id)) {
      this.id = '0/me';
    }
    this.getInputData();
  }

  getInputData() {
    this.userService.getUserInfo(this.id).subscribe((response) => {
      this.user = response;

      this.user = this.addFields(this.user);
      this.user = this.replaceFieldsNameForTable(this.user);

      this.data = {
        rows: this.user?.reviews,
        columns: columns.reviews,
      };
      this.ready = true;
    });
  }

  addFields(user: IUser): IUser {
    user.reviews = user.reviews?.map(
      ({ categoryID, subcategoryID, ...review }: any) => ({
        ...review,
        categoryName: categoryID?.name,
        subcategoryName: subcategoryID?.name,
      })
    );

    user.ratings = user.ratings?.map(
      ({ product: { productTitle, ...productRest }, ...rating }: any) => ({
        ...rating,
        productTitle,
        ...productRest,
      })
    );

    user.comments = user.comments?.map(
      ({ review: { title, ...reviewRest }, ...comment }: any) => ({
        ...comment,
        reviewTitle: title,
        ...reviewRest,
      })
    );

    user.likes = user.likes?.map(
      ({ review: { title, ...reviewRest }, ...like }: any) => ({
        ...like,
        reviewTitle: title,
        ...reviewRest,
      })
    );

    return user;
  }

  replaceFieldsNameForTable(user: IUser) {
    return JSON.parse(
      JSON.stringify(user)
        .replace(/createdAt/g, 'create')
        .replace(/commentText/g, 'comment-text')
        .replace(/category/g, 'product-category')
        .replace(/productTitle/g, 'product-title')
        .replace(/reviewId/g, 'review-id')
        .replace(/productId/g, 'product-id')
        .replace(/reviewRating/g, 'review-rating')
        .replace(/reviewTitle/g, 'review-title')
    );
  }
}
