import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const baseURL = 'http://127.0.0.1:8000/errors/';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private httpClient: HttpClient) { }
}
