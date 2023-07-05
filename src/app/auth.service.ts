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
  phoneNumber:any
  email:any
  constructor() { }

  setUserCredentials(data: any) {
    console.log('auth',data);
    localStorage.setItem('userName', data.user.firstName)
    localStorage.setItem('userId', data.user.id)
    localStorage.setItem('userToken', data.token)
    localStorage.setItem('email', data.user.email)
    localStorage.setItem('phoneNumber', data.user.phoneNumber)
    localStorage.setItem('isVendor', data.user.isVendor)

  }

  getUserCredentials(){
    this.userName = localStorage.getItem('userName')
    this.userId = localStorage.getItem('userId')
    this.userToken = localStorage.getItem('userToken')
    this.isVendor = localStorage.getItem('isVendor') ==='true';
    this.email =localStorage.getItem('email')
    this.phoneNumber =localStorage.getItem('phoneNumber')
    return {
      name: this.userName,
      token: this.userToken,
      userId: this.userId,
      email:this.email,
      phoneNumber:this.phoneNumber,
      isVendor:this.isVendor,
    }
  }
}
