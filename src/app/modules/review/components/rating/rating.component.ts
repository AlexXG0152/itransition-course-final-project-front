import { Component, Input } from '@angular/core';
import { ClickEvent, RatingChangeEvent } from 'angular-star-rating';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  constructor(private productService: ProductService) {}
  @Input() rating: any;
  @Input() product: any;

  onClickResult?: ClickEvent | number;
  onRatingChangeResult?: RatingChangeEvent;
  error = false;

  onClick = ($event: ClickEvent) => {
    this.productService
      .rateProduct({
        productId: this.product.id,
        rate: `${$event.rating}`,
      })
      .subscribe(
        (result) => {
          this.error = false;
          this.onClickResult = $event.rating;
        },
        (error) => {
          this.error = true;
        }
      );
  };

  onRatingChange = ($event: RatingChangeEvent) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };

  // onHoverRatingChangeResult?: HoverRatingChangeEvent;
  // onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
  //   console.log('onHoverRatingChange $event: ', $event);
  //   this.onHoverRatingChangeResult = $event;
  // };
}
