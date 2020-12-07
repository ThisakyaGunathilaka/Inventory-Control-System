import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {CustomerResolverService} from './customers/customer/customer-resolver.service';
import {CustomerAddComponent} from './customers/customer-add/customer-add.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomerService} from './customers/customer.service';
import {AuthUserInterceptorService} from './auth-user-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    EditCustomerComponent,
    CustomerComponent,
    HomeComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    CustomerAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CustomerResolverService, CustomerService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthUserInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
