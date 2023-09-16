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
    path: `${this.API}/comments/events/`,
  });

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  addComment(comment: ICreatedComment) {
    this.socket.emit('addComment', comment);
    console.log('addCommentsocket');
  }

  getNewComments(): Observable<any> {
    this.socket.on('newComment', (message) => {
      this.message$.next(JSON.parse(message));
    });

    return this.message$.asObservable();
  }
}
