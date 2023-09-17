import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateCommentComponent,
    CommentComponent,
    CommentListComponent,
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    TranslateModule,
  ],
  exports: [CommentListComponent],
})
export class CommentModule {}
