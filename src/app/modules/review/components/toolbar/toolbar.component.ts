import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IReview } from '../../interfaces/review.interface';
import { ReviewService } from '../../services/review.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(
    private router: Router,
    private location: Location,
    private reviewService: ReviewService,
    private userService: UserService
  ) {}

  @Input() review?: IReview;

  showAdminBoardSubject = this.userService.showAdminBoardSubject?.value;

  onEdit() {
    this.router.navigate([`review/${this.review?.id}/edit`], {
      state: {
        data: this.review,
      },
    });
  }

  onDelete() {
    this.reviewService.deleteReview(this.review!.id!).subscribe();
    this.location.back();
  }
}
