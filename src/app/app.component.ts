import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs/internal/Observable';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from './../assets/i18n/en.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'itransition-course-final-project-front';

  theme = 'light';
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(
    private darkModeService: DarkModeService,
    private translate: TranslateService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.darkMode$.subscribe((dark) => {
      if (dark) {
        this.theme = 'dark';
      } else {
        this.theme = 'light';
      }
    });
  }
}
