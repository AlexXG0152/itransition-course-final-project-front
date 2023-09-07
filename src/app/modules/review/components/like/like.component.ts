import { Component } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent {
  liked?: boolean;
  shape: string = 'favorite_outline';

  onClick() {
    this.liked = !this.liked;
    this.shape = this.liked ? 'favorite' : 'favorite_outline'
  }
}
