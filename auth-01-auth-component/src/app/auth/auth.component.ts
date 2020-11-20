import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth-service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoaging = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    // SignUp should be available only when LoginMode = false
    //
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoaging = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
      //   .subscribe(responseData => {
      //     console.log(responseData);
      //     this.isLoaging = false;
      // }, errorMessage => {
      //   console.log(errorMessage);
      //
      //   this.error = errorMessage;
      //   this.isLoaging = false;
      // });
    }
    authObs.subscribe(responseData => {
          console.log(responseData);
          this.isLoaging = false;
          this.router.navigate(['../recipes']);
        }, errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoaging = false;
      });
    authForm.reset();
  }
}
