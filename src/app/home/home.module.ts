import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { LastReviewsComponent } from './components/last-reviews/last-reviews.component';
import { TopReviewsComponent } from './components/top-reviews/top-reviews.component';
import { TagsCloudComponent } from './components/tags-cloud/tags-cloud.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    LastReviewsComponent,
    TopReviewsComponent,
    TagsCloudComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, BrowserModule],
  exports: [HeaderComponent],
})
export class HomeModule {}
