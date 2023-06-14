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
    localStorage.setItem('userName', data.user.firstName)
    localStorage.setItem('userId', data.user.firstName)
    localStorage.setItem('userToken', data.user.token)
  }

  getUserCredentials(){
    this.userName = localStorage.getItem('userName')
    this.userId = localStorage.getItem('userId')
    this.userToken = localStorage.getItem('userToken')

    return {
      name: this.userName,
      tokem: this.userToken,
      userId: this.userId
    }
  }
}
