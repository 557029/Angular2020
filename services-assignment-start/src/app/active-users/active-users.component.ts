import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UsersService} from '../services/users.service';
import {UsersModel} from '../shared/users.model';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input() users: UsersModel[];
  @Output() userSetToInactive = new EventEmitter<UsersModel>();

  constructor(private usersService: UsersService) {
  }

  onSetToInactive(user: UsersModel) {
    this.usersService.setUserStatus(user.userName, false);
    this.userSetToInactive.emit(user);
  }

}
