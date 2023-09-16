import { Component, EventEmitter, Output } from '@angular/core';
import { CommentsService } from '../../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreatedComment } from '../../interfaces/create-comment.interface';


@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  constructor(
    private formBuilder: FormBuilder,
    private commentsService: CommentsService
  ) {}

  commentForm!: FormGroup;
  @Output() newCommentText = new EventEmitter<ICreatedComment>();

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }

  addComment() {
    if (this.commentForm.invalid) {
      return;
    }

    const comment: ICreatedComment = {
      user: 'User',
      commentText: this.commentForm.value.comment,
      createdAt: Date.now(),
      userId: 1,
    };

    this.commentsService.addComment(comment)
    this.newCommentText.emit(comment);

    console.log('New comment:', comment);

    this.commentForm.reset();
  }
}
