import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  constructor(private translate: TranslateService) {}

  locales = environment.LOCALES;
  language: string = window.localStorage.getItem('locale') ?? this.locales[0];

  useLanguage(language: string): void {
    this.translate.use(language);
    this.language = language;
    window.localStorage.setItem('locale', language);
  }
}
