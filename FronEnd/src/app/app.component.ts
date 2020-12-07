import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthUserService} from './auth-user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isUserLoggedIn = false;
  error: string = null;
  private userSubscription: Subscription;

  constructor(private authService: AuthUserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isUserLoggedIn = !!user;
        console.log(this.isUserLoggedIn);
      }
    );

  }

  onSubmit(form: NgForm): void {
    const username = form.value.username;
    const password = form.value.password;
    this.authService.login(username, password).subscribe(
      response => {
        this.isUserLoggedIn = true;
      }, error => {
        if (error.statusText === 'Unauthorized'){
          this.error = 'Username or Password is invalid';
        }else {
          this.error = 'An Error Occured';
        }
        console.log(this.error);
      }
    );
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
