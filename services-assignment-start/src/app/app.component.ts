import { Component } from '@angular/core';
import {UsersService} from './services/users.service';
import {UsersModel} from './shared/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // activeUsers = ['Max', 'Anna'];
  // inactiveUsers = ['Chris', 'Manu'];
  constructor(private usersService: UsersService) {
  }

  getUsers(userStatus: boolean): UsersModel[] {
    return this.usersService.usersList.filter(value => value.userStatus === userStatus);
  }
}
