import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserInfoComponent } from './components/user-info/user-info.component';


@NgModule({
  declarations: [
    UserPageComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
