import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IReview } from '../../interfaces/review.interface';
import { ReviewService } from '../../services/review.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { StorageService } from 'src/app/modules/auth/services/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private reviewService: ReviewService,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  @Input() review?: IReview;

  showAdminBoardSubject = this.userService.showAdminBoardSubject?.value;
  userId: number = 0;

  ngOnInit(): void {
    this.userId = +this.storageService.getUser();
  }

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
