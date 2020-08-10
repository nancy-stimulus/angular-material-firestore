import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CustomerComponent } from './components/customer/customer.component';


const routes: Routes = [
  {path: '', component: CustomerComponent },
  {path: 'login', component: SignInComponent },
  {path: 'signUp', component: SignupComponent},
  {path: 'addCustomer', component: CustomerComponent },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
