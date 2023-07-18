import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  basicInfoData: any;
  uploadPictureData: any;
  cardetailsData: any;
  constructor() { }

  //assign basicInfoData
  setbasicInfoData(data: any){
    this.basicInfoData = data;
  }
  //To get basicInfoData
  getbasicInfoData(){
    return this.basicInfoData;
  }

  //assign uploadPictureData
  setuploadPictureData(data: any){
    this.uploadPictureData = data;
    console.log(data)
  }
  //To get uploadPictureData
  getuploadPictureData(){
    return this.uploadPictureData ;
  }

  //assign cardetailsData
  setcardetailsData(data: any){
    this.cardetailsData = data;
  }
  //To get cardetailsData
  getcardetailsData(){
    return this.cardetailsData ;
  }
}
