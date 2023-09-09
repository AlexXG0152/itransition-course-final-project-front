import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
  NgbPopoverModule,
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
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MarkdownModule } from 'ngx-markdown';

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
    MarkdownEditorComponent,
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
    NgbPopoverModule,
    MatButtonModule,
    StarRatingModule,
    TagComponent,
    MatIconModule,
    MatTooltipModule,
    TextFieldModule,
    MarkdownModule
  ],
  exports: [ReviewPreviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReviewModule {}
