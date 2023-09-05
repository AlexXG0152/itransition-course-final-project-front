import { Component, Input } from '@angular/core';
import { IReview } from '../../interfaces/review.interface';

@Component({
  selector: 'app-review-preview',
  templateUrl: './review-preview.component.html',
  styleUrls: ['./review-preview.component.scss']
})
export class ReviewPreviewComponent {
  @Input() reviewData?: IReview;
}
