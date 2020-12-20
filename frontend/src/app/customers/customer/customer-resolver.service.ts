import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {Injectable} from '@angular/core';
import {Customer} from '../customer.model';
import {CustomerService} from '../customer.service';


@Injectable()
export class CustomerResolverService implements Resolve<Customer> {
  constructor(private customerService: CustomerService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Customer> | Promise<Customer> | Customer {
      return this.customerService.getCustomer(1);
    // this.customerService.getCustomer(+route.params.id);
  }
}
