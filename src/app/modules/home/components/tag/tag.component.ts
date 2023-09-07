import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  standalone: true
})
export class TagComponent {
  constructor(private router: Router) {}

  @Input() tag: any;

  handleClick(tag: any) {
    const dbQueryParams = {
      tagId: tag.tagId || tag.id,
      quantity: 10,
      offset: 0,
      orderBy: 'createdAt',
      direction: 'ASC',
    };

    this.router.navigate(['/review/tags'], { queryParams: dbQueryParams });
  }
}
