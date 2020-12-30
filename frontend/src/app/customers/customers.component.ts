import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from './customer.service';
import {Subject} from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  customers: any;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location) {

  }

  getCustomers(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 50]
    };
    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.customers = customers;

        this.dtTrigger.next();
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getCustomers();
    console.log(this.location);

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
          window.location.reload();
        }, error => {
          console.log(error);
        }
      );

    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();


  }


}
