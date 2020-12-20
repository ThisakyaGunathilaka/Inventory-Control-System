import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customer = {
    name: '',
    telephone: '',
    address_set: []
  };
  customerForm: FormGroup;

  constructor(private customerService: CustomerService,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
      address_set : new FormArray([])
    });
  }

  onAddAddresses(): void  {
    console.log('adding addresses');
    const control = new FormControl(null, Validators.required);
    (this.customerForm.get('address_set') as FormArray).push(control);
  }

  getAddresses(){
    return (this.customerForm.get('address_set') as FormArray).controls;
  }

  onSubmit(): void {
    const postData = this.customerForm.value;
    this.customer.name = postData.name;
    this.customer.telephone = postData.telephone;
    for (const address of postData.address_set){
      this.customer.address_set.push({address: address});
    }
    console.log(this.customer);
    this.customerService.createCustomer(this.customer).subscribe(response => {
        console.log(response);
        // alert('Successfully saved');
        this.router.navigate(['customers/']);
      },
      error => {
        alert(error);
      });

  }
}
