import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseURL = 'http://127.0.0.1:8000/communication/';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private httpClient: HttpClient) {
  }

  sendEmail(data): Observable<any> {
    return this.httpClient.post(baseURL + 'send_email/', data);
  }

  sendSms(data): Observable<any> {
    return this.httpClient.post(baseURL + 'send_sms/', data);
  }
}
