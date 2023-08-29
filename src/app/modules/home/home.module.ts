import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { LastReviewsComponent } from './components/last-reviews/last-reviews.component';
import { TopReviewsComponent } from './components/top-reviews/top-reviews.component';
import { TagsCloudComponent } from './components/tags-cloud/tags-cloud.component';
import { HomepageComponent } from './components/homepage/homepage.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    LastReviewsComponent,
    TopReviewsComponent,
    TagsCloudComponent,
    HomepageComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
  exports: [HeaderComponent],
})
export class HomeModule {}
