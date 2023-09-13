import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchInput = new FormControl();
  searchResults: any;
  results = false;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    try {
      this.searchInput.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => this.searchService.search(query))
        )
        .subscribe((results: any) => {
          this.searchResults = results;
          this.results = true;
          console.log(results);
        });
    } catch (error) {
      console.log(error);
    }
  }

  close() {
    this.searchResults = null;
    this.searchInput.setValue('');
  }
}
