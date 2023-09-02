import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'itransition-course-final-project-front';

  theme = 'light';
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.darkMode$.subscribe((i) => {
      if (i) {
        this.theme = 'dark';
      } else {
        this.theme = 'light';
      }
    });
  }
}
