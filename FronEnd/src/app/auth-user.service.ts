import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from './user.model';
import {tap} from 'rxjs/operators';

const baseURL = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const credentials = {username: username, password: password};
    const url: string = baseURL + 'api/token/';

    return this.http.post(url, credentials).pipe(tap(resData => {
      this.updateData(resData, username);
    }));
  }


  private updateData(resData, username) {
    const token = resData.access;
    // decode the token to read the username and expiration timestamp
    const tokenParts = token.split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    const tokenExpires = new Date(tokenDecoded.exp * 1000);
    const user = new User(username, token, tokenExpires);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log(JSON.parse(localStorage.getItem('userData')));
    this.user.next(user);
  }

  autoLogin(): void {

    const userData: {
      username: string, userToken: string, _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    console.log('User Data', userData);
    const loadedUser = new User(
      userData.username, userData.userToken, new Date(userData._tokenExpirationDate));
    console.log(loadedUser);
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

}
