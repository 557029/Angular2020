import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthResponseData {
  idToken: string;        // A Firebase Auth ID token for the newly created user.
  email: string;          // The email for the newly created user.
  refreshToken: string; 	// A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	    // The number of seconds in which the ID token expires.
  localId: string;	      // The uid of the newly created user.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AUTH_KEY]]',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorRes => {
        console.log(errorRes);
        let errorMessage = 'Unknown error occured.';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
        }
        return throwError(errorMessage);
      }));
  }
}
