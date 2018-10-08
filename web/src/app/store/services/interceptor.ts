import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

import config from '../../app.config';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req, next) {
    const storage = JSON.parse(localStorage.getItem(config.jwt.tokenKey));
    let authRequest = req.clone();

    if (storage && storage.token) {
      authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + storage.token.access_token)
      });
    }

    return next.handle(authRequest);
  }
}
