import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFindComponent } from './pages/customer-find/customer-find.component';
import { CustomerInfoComponent } from './pages/customer-info/customer-info.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '',       component: HomeComponent},
  { path: 'home',       component: HomeComponent},
  { path: 'login',       component: LoginComponent},
  { path: 'register',       component: RegisterComponent},
  { path: 'customer-find',       component: CustomerFindComponent},
  { path: 'customer-info',       component: CustomerInfoComponent},
  { path: 'customers',       component: CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
