import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { CreateReviewPageComponent } from './components/create-review-page/create-review-page.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndDirective } from './directives/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgbCarouselModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ReviewPreviewComponent } from './components/review-preview/review-preview.component';
import { ReviewPreviewsListComponent } from './components/review-previews-list/review-previews-list.component';
import { MatButtonModule } from '@angular/material/button';
import { StarRatingModule } from 'angular-star-rating';
import { TagComponent } from '../home/components/tag/tag.component';
import { RatingComponent } from './components/rating/rating.component';
import { LikeComponent } from './components/like/like.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ReviewPageComponent,
    CreateReviewPageComponent,
    DndDirective,
    ProgressComponent,
    ReviewPreviewComponent,
    ReviewPreviewsListComponent,
    RatingComponent,
    LikeComponent,
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbCarouselModule,
    NgbPaginationModule,
    MatButtonModule,
    StarRatingModule,
    TagComponent,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [ReviewPreviewComponent],
})
export class ReviewModule {}
