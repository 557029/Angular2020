import {EventEmitter, Injectable} from '@angular/core';
import {UsersModel} from '../shared/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: UsersModel[] = [
    new UsersModel('Max', true),
    new UsersModel('Anna', true),
    new UsersModel('Chris', false),
    new UsersModel('Manu', false)
  ];
  // activeUsers = ['Max', 'Anna'];
  // inactiveUsers = ['Chris', 'Manu'];
  constructor() { }
  setUserStatus(name: string, status: boolean) {
    const index = this.usersList.findIndex(value => value.userName === name);
    if (index != null) {
      this.usersList[index].userStatus = status;
    }
  }
}
