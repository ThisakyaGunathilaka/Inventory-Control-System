import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseURL = 'http://127.0.0.1:8000/file/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) {
  }


  uploadFile(data): Observable<any> {
    return this.httpClient.post(baseURL + 'upload/', data);
  }

  getAllImages(): Observable<any> {
    return this.httpClient.get(baseURL + 'list/');
  }

  getImage(id): Observable<any> {
    return this.httpClient.get(baseURL + id + '/');
  }


  editImage(data, id): Observable<any> {
    return this.httpClient.put(`${baseURL}${id}` + '/edit/', data);
  }
  deleteImage(id): Observable<any> {
    return this.httpClient.delete(baseURL + id + '/delete/');
  }
}
