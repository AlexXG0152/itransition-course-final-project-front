import { Component, Input } from '@angular/core';
import { IReview } from '../../interfaces/review.interface';
import { IUser } from 'src/app/modules/user/interfaces/user.interface';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-review-preview',
  templateUrl: './review-preview.component.html',
  styleUrls: ['./review-preview.component.scss'],
})
export class ReviewPreviewComponent {
  @Input() reviewData?: IReview;
  @Input() liked?: boolean;
  @Input() showLikeButton: any;
}
