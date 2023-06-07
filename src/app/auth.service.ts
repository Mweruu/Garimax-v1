import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUsersUrl= 'http://localhost:8080/api/users';

  constructor() { }

  // login(email:string, pasword:string):Observable<use>{}
}
