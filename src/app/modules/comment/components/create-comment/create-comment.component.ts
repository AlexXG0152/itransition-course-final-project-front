import { Component, EventEmitter, Output } from '@angular/core';
import { CommentsService } from '../../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreatedComment } from '../../interfaces/create-comment.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private userService: UserService
  ) {}

  showAdminBoardSubject = this.userService.showAdminBoardSubject?.value;
  currentUser = this.userService.getCurrentUser();

  commentForm!: FormGroup;
  // @Output() newCommentText = new EventEmitter<ICreatedComment>();

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
      userId: this.currentUser.id,
      reviewId: +this.route.snapshot.params['id'],
      commentText: this.commentForm.value.comment,
    };

    this.commentsService.addComment(comment);
    // this.newCommentText.emit(comment);

    this.commentForm.reset();
  }
}
