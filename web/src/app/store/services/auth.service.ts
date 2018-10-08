import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import config from '../../app.config';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(config.getApi() + '/Users/login', data);
  }

  logout(data) {
    this.http.post(config.getApi() + '/auth/logout', data);
  }

  signup(data): Observable<any> {
    return this.http.post(config.getApi() + '/auth/signup', data);
  }

  user(): Observable<any> {
    return this.http.get(config.getApi() + '/user');
  }
}
