import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import config from '../../app.config';

import { AuthService } from '../services/auth.service';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Signup,
  SignupSuccess,
  SignupFailure,
  CheckStatus,
  GetStatus,
  GetUser
} from '../actions/auth.actions';

declare var alertify: any;

@Injectable()
export class AuthEffects {
  private errorMessase = 'เกิดความผิดพลาด กรุณาทำรายการอีกครั้ง.';

  constructor(private actions: Actions,
    private authService: AuthService,
    private router: Router) { }

  @Effect()
  Login: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_LOGIN),
    mergeMap((action: Login) => this.authService.login(action.payload)
      .pipe(
        map(res => {
          return new LoginSuccess(res);
        }),
        catchError(error => {
          return of(new LoginFailure(error));
        })
      )
    )
  );

  @Effect()
  LoginSuccess: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_LOGIN_SUCCESS),
    tap((action: LoginSuccess) => {
      const storage = {
        token: action.payload,
        user: null
      };

      localStorage.setItem(config.jwt.tokenKey, JSON.stringify(storage));
    }),
    mergeMap((action: LoginSuccess) => this.authService.user()
      .pipe(
        map(res => {
          return new GetUser(res.user);
        }),
        catchError(error => {
          return of(new LoginFailure(error));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  LoginFailure: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_LOGIN_FAILURE),
    tap((action: LoginFailure) => {
      let error = this.errorMessase;

      if (action.payload.error && action.payload.error.message) {
        error = action.payload.error.message;
      }

      alertify.notify('<i class="far fa-frown"></i><span class="thai">' + error + '</span>', 'error', 5);
    })
  );

  @Effect()
  Signup: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_SIGNUP),
    // map((action: Signup) => action.payload),
    // switchMap(payload => {
    //   return this.authService.signup(payload).pipe(
    //     map(res => {
    //       return new SignupSuccess(res.data);
    //     }),
    //     catchError((error) => {
    //       return of(new SignupFailure(error));
    //     })
    //   );
    // })
  );

  @Effect({ dispatch: false })
  SignupSuccess: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_SIGNUP_SUCCESS),
    // tap((action) => {
    //   let name = action.payload.user.username;

    //   action.payload.user.roles = JSON.parse(action.payload.user.roles);

    //   if (action.payload.user.profile) {
    //     name = (action.payload.user.profile.firstName + ' ' + action.payload.user.profile.lastName).trim();
    //   }

    //   localStorage.setItem(config.jwt.tokenKey, JSON.stringify(action.payload));
    //   alertify.notify('<i class="far fa-smile"></i>Hi ' + (name || 'there') + ', Welcome to Team Aplan!.', 'success', 5);
    //   this.router.navigateByUrl('/' + action.payload.user.roles[0]);
    // })
  );

  @Effect({ dispatch: false })
  SignupFailure: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_SIGNUP_FAILURE),
    // tap(action => {
    //   const error = action.payload.error.message || this.errorMessase;

    //   alertify.notify('<i class="far fa-frown"></i><span class="thai">' + error + '</span>', 'error', 5);
    // })
  );

  @Effect({ dispatch: false })
  Logout: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_LOGOUT),
    tap(() => {
      alertify.confirm('Logout', '<span class="thai">ออกจากระบบ?</span>', () => {
        const storage = JSON.parse(localStorage.getItem(config.jwt.tokenKey));

        if (storage) {
          localStorage.removeItem(config.jwt.tokenKey);
        }

        this.router.navigateByUrl('/');
      }, null);
    })
  );

  @Effect()
  CheckStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_CHECK_STATUS),
    mergeMap(() => {
      let storage = JSON.parse(localStorage.getItem(config.jwt.tokenKey));

      return of(new GetStatus(storage || null));
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_STATUS),
    tap(() => {
      // check valid storage and expries..
      // this.router.navigateByUrl('/auth/login');  
    })
  );

  @Effect()
  GetUser: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_GET_USER),
    mergeMap((action: GetUser) => {
      let storage = JSON.parse(localStorage.getItem(config.jwt.tokenKey));
      let user = action.payload;
      let name = user.email;

      user.roles = JSON.parse(user.roles);
      storage.user = user;
      localStorage.setItem(config.jwt.tokenKey, JSON.stringify(storage));

      alertify.notify('<i class="far fa-smile"></i>Hi ' + (name || 'there') + ', Welcome to Team Aplan!.', 'success', 5);

      return of(new CheckStatus());
    })
  );
}
