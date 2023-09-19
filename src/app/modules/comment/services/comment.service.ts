import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreatedComment } from '../interfaces/create-comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  API = environment.API;

  socket = io(environment.WEBSOCKET_URL, {
    path: `/api/v1/comments/events/`,
  });

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  addComment(comment: ICreatedComment) {
    this.socket.emit('addComment', comment);
    console.log('addCommentsocket', comment);
  }

  getNewComments(): Observable<any> {
    this.socket.on('newComment', (message) => {
      if (message !== '') {
        this.message$.next(message);
      }
    });

    return this.message$.asObservable();
  }
}
