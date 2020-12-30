import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Params, Router, } from '@angular/router';
import {CustomerService} from '../customer.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customer = {
    id: 0,
    name: '',
    telephone: '',
    address_set: []
  };
  allowEdit = false;
  isEmptyField = false;
  notFound = false;
  customerForm: FormGroup;
  address_set: any;

  // changesSaved = false;
  constructor(private customerService: CustomerService,
              private  route: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.customer.id = +this.route.snapshot.params.id;
    // initializing form array
    this.customerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
      address_set: new FormArray([])
    });
    this.address_set = (this.customerForm.get('address_set') as FormArray);
    // getting data from the server
    this.customerService.getCustomer(+this.customer.id).subscribe(
      customer => {
        console.log(customer.address_set);
        this.customerForm.patchValue({
          name: customer.name,
          telephone: customer.telephone,
        });
        // generation of formcontrols
        for (const address of customer.address_set) {
          console.log(address);
          this.address_set.push(new FormControl(address.address, Validators.required));
        }
      },
      error => {
        console.log(error);
        this.notFound = true;
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


  onUpdateCustomer(): void {
    const postData = this.customerForm.value;
    this.customer.name = postData.name;
    this.customer.telephone = postData.telephone;
    for (const address of postData.address_set) {
      this.customer.address_set.push({address});
    }
    this.customerService.updateCustomer(this.customer).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
