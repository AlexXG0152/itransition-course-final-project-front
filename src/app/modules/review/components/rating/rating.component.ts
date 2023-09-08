import { Component, Input } from '@angular/core';
import { ClickEvent, RatingChangeEvent } from 'angular-star-rating';
import { ProductService } from '../../services/product.service';
import { Subscription, catchError, tap } from 'rxjs';
import { StorageService } from 'src/app/modules/auth/services/storage.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  constructor(
    private productService: ProductService,
    private storageService: StorageService
  ) {}
  @Input() rating: any;
  @Input() product: any;

  onClickResult?: ClickEvent | number;
  onRatingChangeResult?: RatingChangeEvent;
  error = false;
  notAuthorized = false;

  onClick = ($event: ClickEvent) => {
    this.productService
      .rateProduct({
        productId: this.product.id,
        rate: `${$event.rating}`,
      })
      .pipe(
        tap((result) => {
          this.error = false;
          this.onClickResult = $event.rating;
        }),
        catchError((error) => {
          if (error.error.message === 'User not authorized') {
            this.notAuthorized = true;
          } else {
            this.error = true;
          }
          throw error;
        })
      )
      .subscribe();
  };

  onRatingChange = ($event: RatingChangeEvent) => {
    this.onRatingChangeResult = $event;
  };

  // onHoverRatingChangeResult?: HoverRatingChangeEvent;
  // onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
  //   this.onHoverRatingChangeResult = $event;
  // };
}
