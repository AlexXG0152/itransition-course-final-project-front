import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageComponent } from './components/language/language.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';
import { TagsCloudComponent } from './components/tags-cloud/tags-cloud.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewModule } from '../review/review.module';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    TagsCloudComponent,
    HomepageComponent,
    DarkModeComponent,
    LanguageComponent,
    CarouselComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TagComponent,
    NgbCarouselModule,
    ReviewModule
  ],
  exports: [HeaderComponent],
})
export class HomeModule {}
