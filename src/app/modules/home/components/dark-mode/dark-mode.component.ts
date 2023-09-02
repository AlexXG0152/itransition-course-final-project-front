import { Component } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent {
  constructor(private darkModeService: DarkModeService) {}

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  onToggle(): void {
    this.darkModeService.toggle();
  }
}
