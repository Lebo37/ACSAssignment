import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProxyService } from './services/proxy.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerInfoComponent } from './pages/customer-info/customer-info.component';
import { CustomerFindComponent } from './pages/customer-find/customer-find.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CustomersComponent,
    CustomerInfoComponent,
    CustomerFindComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule
  ],
  providers: [ProxyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
