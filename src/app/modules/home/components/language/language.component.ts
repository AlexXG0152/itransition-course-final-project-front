import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  locales: any;
  language: string;

  constructor(private translate: TranslateService) {
    this.locales = environment.LOCALES.split(', ');
    this.language = this.locales[0];
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.language = language;
    console.log(language);
  }
}
