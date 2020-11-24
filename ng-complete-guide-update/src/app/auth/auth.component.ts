import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth-service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoaging = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
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
          this.showErrorAlert(errorMessage);
      });
    authForm.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // Clear all prev.components
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    // Make sure we'll unsubscribe closeSub property.
    //
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
