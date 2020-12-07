import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  customer = {
    name: '',
    telephone: ''
  };

  constructor(private customerService: CustomerService,
              private  router: Router) {
  }

  ngOnInit(): void {
  }

  onCreatePost(postData: { 'name': string; 'telephone': string }): void {
    this.customerService.createCustomer(postData).subscribe(response => {
        alert('Successfully saved');
        this.router.navigate(['customers/']);
      },
      error => {
        alert(error);
      });

  }
}
