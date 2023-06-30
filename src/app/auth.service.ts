import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: any
  userToken: any
  userId: any
  isVendor!:boolean;
  constructor() { }

  setUserCredentials(data: any) {
    console.log('auth',data);
    localStorage.setItem('userName', data.user.firstName)
    localStorage.setItem('userId', data.user.id)
    localStorage.setItem('userToken', data.token)
    localStorage.setItem('isVendor', data.user.isVendor)

  }

  getUserCredentials(){
    this.userName = localStorage.getItem('userName')
    this.userId = localStorage.getItem('userId')
    this.userToken = localStorage.getItem('userToken')
    this.isVendor = localStorage.getItem('isVendor') ==='true';

    return {
      name: this.userName,
      token: this.userToken,
      userId: this.userId,
      isVendor:this.isVendor,
    }
  }
}
