import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {

  }

  onLoadCustomers(): void{
    this.router.navigateByUrl('/customers', {skipLocationChange: false});
  }

  onLoadCreateCustomers(): void{
    this.router.navigateByUrl('/customers/add', {skipLocationChange: false});
  }

}
