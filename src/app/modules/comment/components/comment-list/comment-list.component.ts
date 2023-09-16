import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comment.service';

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
    this.commentsService.getNewComments().subscribe((comment) => {
      if (comment !== '') {
        this.comments!.push(comment);
      }
    });
  }

  handleNewComment(event: any) {
    console.log(this.comments);
    this.comments?.push(event)
    this.getComments();
  }
}
