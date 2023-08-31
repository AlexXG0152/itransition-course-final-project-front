import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { CreateReviewPageComponent } from './components/create-review-page/create-review-page.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReviewPageComponent, CreateReviewPageComponent],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ReviewModule {}
