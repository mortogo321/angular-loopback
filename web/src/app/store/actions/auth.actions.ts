import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AUTH_LOGIN = '[Auth] Login',
  AUTH_LOGIN_SUCCESS = '[Auth] Login Success',
  AUTH_LOGIN_FAILURE = '[Auth] Login Failure',
  AUTH_SIGNUP = '[Auth] Signup',
  AUTH_SIGNUP_SUCCESS = '[Auth] Signup Success',
  AUTH_SIGNUP_FAILURE = '[Auth] Signup Failure',
  AUTH_LOGOUT = '[Auth] Logout',
  AUTH_LOGOUT_SUCCESS = '[Auth] Logout Success',
  AUTH_CHECK_STATUS = '[Auth] Check Status',
  AUTH_STATUS = '[Auth] Status',
  AUTH_GET_USER = '[Auth] Get User'
}

export class Login implements Action {
  readonly type = AuthActionTypes.AUTH_LOGIN;

  constructor(public payload: any) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_LOGIN_SUCCESS;

  constructor(public payload: any) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.AUTH_LOGIN_FAILURE;

  constructor(public payload: any) { }
}

export class Signup implements Action {
  readonly type = AuthActionTypes.AUTH_SIGNUP;

  constructor(public payload: any) { }
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_SIGNUP_SUCCESS;

  constructor(public payload: any) { }
}

export class SignupFailure implements Action {
  readonly type = AuthActionTypes.AUTH_SIGNUP_FAILURE;

  constructor(public payload: any) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.AUTH_LOGOUT;
}

export class CheckStatus implements Action {
  readonly type = AuthActionTypes.AUTH_CHECK_STATUS;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.AUTH_STATUS;

  constructor(public payload: any) { }
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.AUTH_GET_USER;

  constructor(public payload: any) { }
}

export type All =
  | Login
  | LoginSuccess
  | LoginFailure
  | Signup
  | SignupSuccess
  | SignupFailure
  | Logout
  | CheckStatus
  | GetStatus
  | GetUser;
