import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CustomersComponent} from './customers/customers.component';
import {CustomerComponent} from './customers/customer/customer.component';
import {EditCustomerComponent} from './customers/edit-customer/edit-customer.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {CustomerAddComponent} from './customers/customer-add/customer-add.component';



const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomeComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'customer/:id', component: CustomerComponent},
  {path: 'customers/add',  component: CustomerAddComponent},
  {path: 'customer/:id/edit', component: EditCustomerComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '403', component: ErrorPageComponent, data: {message: 'Not Authorized'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
