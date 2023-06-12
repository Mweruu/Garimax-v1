import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: any
  userToken: any
  userId: any
  constructor() { }

  setUserCredentials(data: any) {
    this.userName = data.user.firstName,
    this.userId = data.user.id
    this.userToken = data.token
  }

  getUserCredentials(){
    return {
      name: this.userName,
      tokem: this.userToken,
      userId: this.userId
    }
  }
}
