import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../app/components/user/user.component';
import { UserDetailsComponent } from '../app/components/user-details/user-details.component';

const routes: Routes = [
  {path: '', component: UserComponent },
  {path: 'addUser', component: UserComponent },
  {path: 'editUser/:id', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
