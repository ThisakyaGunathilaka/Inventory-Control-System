import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer = {id: '', name: '', telephone: '', address_set: []};
  notFound = false;
  constructor(private customerService: CustomerService,
              private router: Router,
              private  route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    console.log(id);
    this.customerService.getCustomer(+id).subscribe(customer => {
        this.customer = customer;
        console.log(this.customer);
      }, (error) => {
        console.log(error);
        this.notFound = true;
      }
    );
  }

  onCustomerEdit() {
    const id = +this.route.snapshot.params.id;
    this.router.navigate(['./customer', id, 'edit'], {
      queryParams: {allowEdit: '1'}
    });
  }

}
