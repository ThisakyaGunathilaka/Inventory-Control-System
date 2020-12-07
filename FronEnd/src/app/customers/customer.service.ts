import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseURL = 'http://127.0.0.1:8000/customers/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCustomers(): Observable<any> {
    return this.httpClient.get(baseURL + 'list/');
  }

  getCustomer(id): Observable<any> {
    return this.httpClient.get(`${baseURL}${id}`);
  }

  createCustomer(data): Observable<any> {
    return this.httpClient.post(baseURL + 'add/', data);
  }

  updateCustomer(id, data): Observable<any> {
    return this.httpClient.put(`${baseURL}${id}` + '/edit/', data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${baseURL}${id}` + '/delete/');
  }
}
