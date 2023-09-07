import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LastReviewsComponent } from './components/last-reviews/last-reviews.component';
import { TopReviewsComponent } from './components/top-reviews/top-reviews.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageComponent } from './components/language/language.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';
import { TagsCloudComponent } from './components/tags-cloud/tags-cloud.component';
// import { TagComponent } from './components/tag/tag.component';

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
    // TagComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
    FormsModule,
    TagComponent
  ],
  exports: [HeaderComponent],
})
export class HomeModule {}
