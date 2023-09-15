import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { TagService } from 'src/app/modules/home/services/tag.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputComponent {
  constructor(private tagService: TagService) {}

  @ViewChild('tagInput') tagInput?: ElementRef;
  @Output() tagsChanged = new EventEmitter<string[]>();

  @Input() tags: string[] = [];

  tagSearchInput = new FormControl();
  tagSearchResults: any[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {
    try {
      this.tagSearchInput.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => {
            if (query === null || query === '') {
              return of([]);
            } else {
              return this.tagService.searchTags(query);
            }
          })
        )
        .subscribe((result: string[]) => (this.tagSearchResults = result));
    } catch (error) {
      console.log(error);
    }
  }

  add(event: MatChipInputEvent): void {
    const input: HTMLInputElement = event.input;
    const value: string = event.value;

    if ((value || '').trim() && this.tags.length <= 9) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.tagsChanged.emit(this.tags);
    this.tagSearchInput.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagsChanged.emit(this.tags);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagsChanged.emit(this.tags);
    this.tagInput!.nativeElement.value = '';
    this.tagSearchInput.setValue(null);
  }
}
