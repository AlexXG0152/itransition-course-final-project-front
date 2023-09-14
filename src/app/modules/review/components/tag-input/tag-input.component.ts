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
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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
    console.log(this.tags);

    try {
      this.tagSearchInput.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => this.tagService.searchTags(query))
        )
        .subscribe((result) => (this.tagSearchResults = result));
    } catch (error) {
      console.log(error);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.tags.length <= 19) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.tagsChanged.emit(this.tags)
    this.tagSearchInput.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagsChanged.emit(this.tags)
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput!.nativeElement.value = '';
    this.tagsChanged.emit(this.tags)
    this.tagSearchInput.setValue(null);
  }
}
