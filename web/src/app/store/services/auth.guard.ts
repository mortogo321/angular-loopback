import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, AuthState } from '../app.states';

@Injectable()
export class AuthGuard implements CanActivate {
  public state: Observable<any>;
  public user: any;

  constructor(private store: Store<AppState>,
    private router: Router) {
    this.state = this.store.pipe(select(AuthState));
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let isValid = false;

    this.state.subscribe(state => {
      if (state.user) {
        const roles = route.data.roles || [];
        let validRoles = [];

        isValid = state.isAuthenticated;

        validRoles = roles.filter(n => {
          return state.user.roles.indexOf(n) !== -1;
        });

        if (!isValid || !validRoles.length) {
          this.router.navigateByUrl('/');
        }
      }
    });

    return isValid;
  }
}
