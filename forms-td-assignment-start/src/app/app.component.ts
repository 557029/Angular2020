import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') singUpForm;
  subscriptionTypes = [
    'Basic',
    'Advanced',
    'Pro'];

  subscription = {
    email: '',
    password: '',
    subscription: 'advanced'
  };
  defaultSubscription = this.subscriptionTypes[1];
  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log(this.singUpForm);
    // this.subscription.email = this.singUpForm.value.
    this.subscription.email = this.singUpForm.value.addressData.email;
    this.subscription.password = this.singUpForm.value.addressData.password;
    this.subscription.subscription = this.singUpForm.value.addressData.subscription;

    console.log(this.subscription);
    this.singUpForm.reset();
  }
}
