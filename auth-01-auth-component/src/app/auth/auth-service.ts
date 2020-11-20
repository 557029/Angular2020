import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {User} from './user.model';

export interface AuthResponseData {
  idToken: string;        // A Firebase Auth ID token for the newly created user.
  email: string;          // The email for the newly created user.
  refreshToken: string; 	// A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	    // The number of seconds in which the ID token expires.
  localId: string;	      // The uid of the newly created user.
  registered?: boolean;    // Whether the email is for an existing account.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();
  private projectWebKey = '****';
  constructor(private http: HttpClient) {
  }
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.projectWebKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorRes => this.handleError(errorRes)),
      tap( resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      })
    );
  }

  login(email: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.projectWebKey;
    return this.http.post<AuthResponseData>(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => this.handleError(errorRes)),
      tap( resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      })
    );
  }

  private handleAuthentication(email: string,
                               userId: string,
                               token: string,
                               expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured.';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email address not found';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User has been disabled';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
