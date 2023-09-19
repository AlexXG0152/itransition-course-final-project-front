import { Component, Input } from '@angular/core';
import { CommentsService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  constructor(private commentsService: CommentsService) {}

  @Input() comment: any;

  handleDeleteComment(event: any) {
    console.log('del', event);
  }
}
