import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommunicationService} from '../communication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  sms = {
    number: '',
    message: ''
  };
  sendSmsForm: FormGroup;
  constructor(private communicationService: CommunicationService,
              private router: Router) { }

  ngOnInit(): void {
    this.sendSmsForm = new FormGroup({
      number: new FormControl(
        null,
        [Validators.required, Validators.minLength(5)]
      ),
      message: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void{
    this.sms.number = this.sendSmsForm.value.number;
    this.sms.message = this.sendSmsForm.value.message;
    if (this.sendSmsForm.valid){
      this.communicationService.sendSms(this.sms).subscribe(response => {
        console.log(response);
        alert('Email Sent Successfully');
      }, error => {
        console.log(error);
      });
    }else{
      console.log('Please enter valid details');
    }
    this.sendSmsForm.reset();
  }
}
