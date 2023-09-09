import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  locales = environment.LOCALES;
  language: string = this.locales[0];

  constructor(private translate: TranslateService) {}

  useLanguage(language: string): void {
    this.translate.use(language);
    this.language = language;
  }
}
