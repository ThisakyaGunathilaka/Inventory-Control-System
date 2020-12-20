import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router,} from '@angular/router';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer.model';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer: Customer = new Customer();
  customerName = '';
  customerPhone = '';
  allowEdit = false;
  isEmptyField = false;


  // changesSaved = false;

  constructor(private customerService: CustomerService,
              private  route: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.customerService.getCustomer(+id).subscribe(
      customer => {
        this.customer = customer;
        this.customerName = this.customer.name;
        this.customerPhone = this.customer.telephone;
      },
      error => {
        console.log(error);
      }
    );

    // getting the data from router parameter
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        if (queryParams.allowEdit === '1') {
          this.allowEdit = true;
        }
      }
    );
  }

  onUpdateCustomer(formValue): void {
    if (this.allowEdit) {
      if (formValue.name === '' || formValue.telephone === ''){
        this.isEmptyField = true;
        return;
      }
      this.customer.name = formValue.name;
      this.customer.telephone = formValue.telephone;
      this.customerService.updateCustomer(this.customer).subscribe(
        response => {
          alert('Successfully saved');
          this.router.navigate(['/customers']);
        }, error => {
          alert(error);
        }
      );

    }
  }

  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean  {
  //   if (!this.allowEdit){
  //     return true;
  //   }
  //   if ((this.customerName !== this.customer.name || this.customerPhone !== this.customer.phone)
  //     && !this.changesSaved  ){
  //     return confirm('Do you want to discard the changes ?');
  //   }
  // }

}
