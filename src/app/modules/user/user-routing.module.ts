import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: UserPageComponent },
      { path: 'personal', redirectTo: '' },
    ],
  },
  {
    path: ':id',
    component: UserPageComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
