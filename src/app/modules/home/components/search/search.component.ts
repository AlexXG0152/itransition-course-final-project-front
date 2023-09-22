import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchInput = new FormControl();
  searchResults: any;
  showResults = false;

  constructor(private searchService: SearchService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    try {
      this.searchInput.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => {
            if (query.trim().length === 0) {
              return of(7);
            } else {
              return this.searchService.search(query);
            }
          })
        )
        .subscribe((results: any) => {
          this.searchResults = results;
          this.showResults = true;
        });
    } catch (error) {
      console.log(error);
    }
  }
  close(reviewId: number) {
    this.searchResults = null;
    this.searchInput.setValue('');
    this.router.navigate([`/review/`, reviewId]);
  }
}
