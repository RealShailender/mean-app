import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<any>('http://localhost:3010/api/tasks');
  }
}
