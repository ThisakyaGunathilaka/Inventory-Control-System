import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer=  {id: '', name: '', telephone: ''};

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
        console.log(customer);
      }, (error) => {
        console.log(error);
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
