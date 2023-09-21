import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comment.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  constructor(private commentsService: CommentsService) {}

  @Input() comments?: string[] = [];

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.commentsService
      .getNewComments()
      .pipe(take(2))
      .subscribe((comment) => {
        if (comment !== '') {
          this.comments!.push(comment);
        }
      });
  }
}
