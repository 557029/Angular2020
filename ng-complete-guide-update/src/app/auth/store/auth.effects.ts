import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user.model';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (pExpiresIn: number, pEmail: string, pUserId: string, pToken: string) => {
  const dtExpirationDate = new Date(new Date().getTime() + +pExpiresIn * 1000);
  const user = new User(pEmail, pUserId, pToken, dtExpirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: pEmail,
    userId: pUserId,
    token: pToken,
    expirationDate: dtExpirationDate});
};
const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((sighupAction: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
          environment.firebaseAPIKey,
          {
            email: sighupAction.payload.email,
            password: sighupAction.payload.password,
            returnSecureToken: true
          }
        ).pipe(map(respData => {
          return handleAuthentication(
            +respData.expiresIn,
            respData.email,
            respData.localId,
            respData.idToken);

        }), catchError(errorRes => {
          return handleError(errorRes);
        }));
      }
    )
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true
            }
            ).pipe(map(respData => {
              return handleAuthentication(
                +respData.expiresIn,
                respData.email,
                respData.localId,
                respData.idToken);

          }), catchError(errorRes => {
            return handleError(errorRes);
            })
          );
      })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), tap(() => {
    this.router.navigate(['/']);
  }));

  @Effect()
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap( () => {
    localStorage.removeItem('userData');
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return {type: 'DUMMY'};
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      // this.user.next(loadedUser);
      return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      // const expirationDuration =
      //   new Date(userData._tokenExpirationDate).getTime() -
      //   new Date().getTime();
      // this.autoLogout(expirationDuration);
      return {type: 'DUMMY'};
    }
  }));

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {
  }
}
