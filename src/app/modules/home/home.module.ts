import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LastReviewsComponent } from './components/last-reviews/last-reviews.component';
import { TopReviewsComponent } from './components/top-reviews/top-reviews.component';
import { TagsCloudComponent } from './components/tags-cloud/tags-cloud.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageComponent } from './components/language/language.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    LastReviewsComponent,
    TopReviewsComponent,
    TagsCloudComponent,
    HomepageComponent,
    DarkModeComponent,
    LanguageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [HeaderComponent],
})
export class HomeModule {}
