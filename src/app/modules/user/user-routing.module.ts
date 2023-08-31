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
      // { path: 'reviews', component: EmployeeFamilyComponent },
      // { path: 'likes', component: EmployeeEducationComponent },
      // { path: 'products', component: UploadFilesComponent },
      // { path: 'ratings', component: EmployeeGrowthPlanComponent },
      // { path: 'photos', component: EmployeePrintFormsComponent },
      // { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
