import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];
  constructor() { }

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find(
      (s) => {
        return s.id === id;
      }
    );
    return user;
  }

  updateUser(id: number, userInfo: {name: string}) {
    const user = this.users.find(
      (s) => {
        return s.id === id;
      }
    );
    if (user) {
      user.name = userInfo.name;
    }
  }

}
