import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoaging = false;
  error: string = null;

  constructor(private authService: AuthService) {
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
    this.isLoaging = true;
    if (!this.isLoginMode) {
      const email = authForm.value.email;
      const password = authForm.value.password;
      this.authService.signup(email, password).subscribe(responseData => {
        console.log(responseData);
        this.isLoaging = false;
      }, errorMessage => {
        console.log(errorMessage);

        this.error = errorMessage;
        this.isLoaging = false;
      });
    }
    authForm.reset();
  }
}
