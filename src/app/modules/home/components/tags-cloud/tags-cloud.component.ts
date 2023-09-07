import { Component, Input, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.scss'],
})
export class TagsCloudComponent implements OnInit {
  constructor(private tagService: TagService, private router: Router) {}

  tags: any[] = [];
  searchQuery: any = '';

  ngOnInit() {
    this.getPopularTags();
  }

  getPopularTags() {
    this.tagService.getPopularTags().subscribe((tags: string[]) => {
      this.tags = tags;
    });
  }

  searchTags() {
    if (this.searchQuery === '') {
      return this.getPopularTags();
    }
    this.tagService.searchTags(this.searchQuery).subscribe((tags: string[]) => {
      this.tags = tags;
    });
  }

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
