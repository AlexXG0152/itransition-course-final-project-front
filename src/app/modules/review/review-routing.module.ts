import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { CreateReviewPageComponent } from './components/create-review-page/create-review-page.component';
import { ReviewPreviewsListComponent } from './components/review-previews-list/review-previews-list.component';
import { authGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ReviewPageComponent,
  },
  { path: 'list', component: ReviewPreviewsListComponent },
  { path: 'popular', component: ReviewPreviewsListComponent },
  { path: 'latest', component: ReviewPreviewsListComponent },
  { path: 'tags', component: ReviewPreviewsListComponent },
  {
    path: 'create',
    component: CreateReviewPageComponent,
    data: { edit: false },
    canActivate: [authGuard]
  },
  { path: ':id', component: ReviewPageComponent },
  {
    path: ':id/edit',
    component: CreateReviewPageComponent,
    data: { edit: true },
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
