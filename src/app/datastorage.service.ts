import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const env = process.env['NODE_ENV'];
const LOCAL_BASE_URL = 'http://localhost:8080';
const PROD_BASE_URL = 'https://garimax-front-zf57t.ondigitalocean.app/garimax-backend';
let BASE_URL: String

if(env === 'production'){
  BASE_URL = PROD_BASE_URL;
}else{
  BASE_URL = LOCAL_BASE_URL;
}
console.log("environment", env)
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private getUsersUrl= `${BASE_URL}/api/users`;
  private userLoginUrl = `${BASE_URL}/api/users/login`;
  private createUserUrl = `${BASE_URL}/api/users/register`;
  private createindividualVendorUrl = `${BASE_URL}/api/singleVendor/register`;
  private createcompanyVendorUrl = `${BASE_URL}/api/coVendor/register`;
  private createVehicleUrl = `${BASE_URL}/api/addVehicle`;
  private getVehicleUrl = `${BASE_URL}/api/getVehicles`;
  private getSingleVehicleUrl = `${BASE_URL}/api/getVehicle`
  private getSingleUserUrl = `${BASE_URL}/api/user`
  private updateProfileUrl = `${BASE_URL}/api/user/updateProfile`
  private getVehicleByUserId = `${BASE_URL}/api/getVendorVehicles`
  private updateVehicleUrl = `${BASE_URL}/api/user/updateVehicle`
  user:any;

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.createUserUrl}`, user);
  }
  userLogin(user: any): Observable<any> {
    return this.http.post<any>(`${this.userLoginUrl}`, user);
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.getUsersUrl}`);
  }
  getUser(id:string): Observable<any> {
    return this.http.get<any>(`${this.getSingleUserUrl}/${id}`);
  }
  createIndividualVendor(vendor:any): Observable<any> {
    return this.http.post<any>(`${this.createindividualVendorUrl}`,vendor);
  }
  createCompanyVendor(vendor:any): Observable<any> {
    return this.http.post<any>(`${this.createcompanyVendorUrl}`, vendor);
  }
  createVehicle(vendor:any): Observable<any> {
    return this.http.post<any>(`${this.createVehicleUrl}`, vendor);
  }
  getVehicles(): Observable<any> {
    return this.http.get<any>(`${this.getVehicleUrl}`);
  }
  getVehicle(id:string): Observable<any> {
    return this.http.get<any>(`${this.getSingleVehicleUrl}/${id}`);
  }
  updateProfile(id:string, value:any){
    console.log("yee",id)
    return this.http.put<any>(`${this.updateProfileUrl}/${id}`,value);
  }
  getUserVehicle(userId:string){
    return this.http.get<any>(`${this.getVehicleByUserId}/${userId}`);
  }
  updateVehicle(id:string, value:any){
    console.log("yee",id)
    return this.http.put<any>(`${this.updateVehicleUrl}/${id}`,value);
  }
}
