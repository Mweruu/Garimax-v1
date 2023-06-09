import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private getUsersUrl= 'http://localhost:8080/api/users';
  private userLoginUrl = 'http://localhost:8080/api/users/login';
  private createUserUrl = 'http://localhost:8080/api/users/register';
  private createindividualVendorUrl = 'http://localhost:8080/api/singleVendor/register';
  private createcompanyVendorUrl = 'http://localhost:8080/api/coVendor/register';
  private createVehicleUrl = 'http://localhost:8080/api/addVehicle';
  private getVehicleUrl = 'http://localhost:8080/api/getVehicles'

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
    const singleVehicleUrl = `${this.getVehicleUrl}/${id}`; // Append the vehicleId to the URL
    return this.http.get<any>(singleVehicleUrl);
    // return this.http.get<any>(`${this.getVehicleUrl}`);
  }
  getOptions(): Observable<any> {
    return this.http.get<any>('/assets/data/carproperties.json')
        // .toPromise()
        // .then(res => res.data as any[])
        // .then(data => data);
}
}
