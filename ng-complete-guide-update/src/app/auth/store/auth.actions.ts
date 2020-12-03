import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERRORS = '[Auth] Clear Errors';
export const AUTO_LOGIN = '[Auth] Auto Login';


export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {email: string, password: string}) {
  }
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;

}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {
  }
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: {email: string, password: string}) {
  }
}

export class ClearErrors implements Action {
  readonly type = CLEAR_ERRORS;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignUpStart
  | ClearErrors
  | AutoLogin;
