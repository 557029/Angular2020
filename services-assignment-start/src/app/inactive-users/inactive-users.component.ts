import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsersService} from '../services/users.service';
import {UsersModel} from '../shared/users.model';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  @Input() users: UsersModel[] = [];
  @Output() userSetToActive = new EventEmitter<UsersModel>();
  constructor(private userService: UsersService) {
  }

  onSetToActive(user: UsersModel) {
    this.userService.setUserStatus(user.userName,  true);
    this.userSetToActive.emit(user);
    // this.refreshList();
  }
}
