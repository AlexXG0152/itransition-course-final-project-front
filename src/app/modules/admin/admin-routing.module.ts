import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { authGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { path: '', component: UserTableComponent, pathMatch: 'full', canActivate: [authGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
