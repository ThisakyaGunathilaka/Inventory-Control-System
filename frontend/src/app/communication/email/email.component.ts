import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommunicationService} from '../communication.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  email = {
    email_receiver: '',
    subject: '',
    message: ''
  };
  sendEmailForm: FormGroup;

  constructor(private communicationService: CommunicationService,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.sendEmailForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null, [Validators.required]),
      message: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.email.email_receiver = this.sendEmailForm.value.email;
    this.email.subject = this.sendEmailForm.value.subject;
    this.email.message = this.sendEmailForm.value.message;
    if (this.sendEmailForm.valid) {
      this.communicationService.sendEmail(this.email).subscribe(response => {
        console.log(response);
      },
        error => {
          console.log(error);
        });
    } else {
      console.log('Please fill all the details');
    }

  }

}
