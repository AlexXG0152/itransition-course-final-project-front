import { Component, Input, OnInit } from '@angular/core';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.scss'],
})
export class TagsCloudComponent implements OnInit {
  constructor(private tagService: TagService) {}

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
}
