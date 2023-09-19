import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgbCarouselModule,
  NgbPaginationModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { StarRatingModule } from 'angular-star-rating';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { CreateReviewPageComponent } from './components/create-review-page/create-review-page.component';
import { DndDirective } from './directives/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { ReviewPreviewComponent } from './components/review-preview/review-preview.component';
import { ReviewPreviewsListComponent } from './components/review-previews-list/review-previews-list.component';
import { TagComponent } from '../home/components/tag/tag.component';
import { RatingComponent } from './components/rating/rating.component';
import { LikeComponent } from './components/like/like.component';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { CommentListComponent } from '../comment/components/comment-list/comment-list.component';
import { CommentModule } from '../comment/comment.module';

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
    ToolbarComponent,
    TagInputComponent,
    ProductInputComponent,
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbCarouselModule,
    NgbPaginationModule,
    NgbPopoverModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    StarRatingModule,
    TextFieldModule,
    MarkdownModule,
    TagComponent,
    CommentModule
  ],
  exports: [ReviewPreviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewModule {}
