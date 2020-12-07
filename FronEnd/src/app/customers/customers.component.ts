import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: { id: number, name: string, telephone: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService) {
  }

  getCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.customers = customers;
        console.log(this.customers);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  onCustomerEdit(id: number): void {
    this.router.navigate(['./customer', id, 'edit'], {
      queryParams: {allowEdit: '1'}
    });
  }

  onCustomerDelete(customer: { id: number; name: string; telephone: string }): void {
    if (confirm('Are you sure want to Delete ' + customer.name + ' ?')) {
      this.customerService.delete(customer.id).subscribe(
        response => {
          console.log(response);
          this.getCustomers();
        }, error => {
          console.log(error);
        }
      );

    }
  }


}
