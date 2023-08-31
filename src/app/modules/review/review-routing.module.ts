import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { CreateReviewPageComponent } from './components/create-review-page/create-review-page.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewPageComponent,
    // canActivate: [AuthGuard],
  },
  { path: 'create', component: CreateReviewPageComponent },
  { path: ':id', component: ReviewPageComponent },
  { path: ':id/edit', component: CreateReviewPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
