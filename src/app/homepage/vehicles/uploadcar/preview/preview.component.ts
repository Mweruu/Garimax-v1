import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { DataStorageService } from 'src/app/datastorage.service';
import { timer } from 'rxjs';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  sidebarVisible3!: boolean;
  carData: any;
  vehicle:any;
  make!:string;
  model!:string;
  year!:string;
  price!:string;
  location!:string;
  mileage!:string;
  fueltype!:string;
  bodytype!:string;
  transmission!:string;
  color!:string;
  steering!:string;
  engine!:string;
  drivetype!:string;
  images: string[] =[];
  properties:any[] = [];
  curr = formatNumber(56789,this.locale,
    '3.1-4');

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor(
    @Inject(LOCALE_ID) public locale : string,
              private dataServive: DataService,
              private messageService: MessageService,
              private router: Router,
              private ds: DataStorageService,
              ) { }

  async ngOnInit(): Promise<void> {
    this.carData = {
      "basicInfo": this.dataServive.getbasicInfoData(),
      "images": this.dataServive.getuploadPictureData(),
      "carDetails": this.dataServive.getcardetailsData()
    }
    if(this.carData.images){
      this.processImageFiles(this.carData.images)
      console.log(this.images);
    }
    if(this.carData.basicInfo){
      this.make = this.carData.basicInfo.make;
      this.model = this.carData.basicInfo.model;
      this.year = this.carData.basicInfo.yearOfManufacture.toString().split(' ')[3];
      this.price =formatNumber(this.carData.basicInfo.price,this.locale,'3.1-4');
      this.location = this.carData.basicInfo.location;
      this.mileage = this.carData.basicInfo.mileage;
    }
    // this.fueltype = this.carData.carDetails.fueltype;
    if(this.carData.carDetails){
      this.bodytype = this.carData.carDetails.bodytype;
      this.transmission = this.carData.carDetails.transmission;
      this.color = this.carData.carDetails.color;
      this.steering = this.carData.carDetails.steering;
      this.engine = this.carData.carDetails.engineSize;
      this.drivetype = this.carData.carDetails.drivetype;
    }

  }

  processImageFiles(files: any[]): void {
    for (const file of files) {
      this.images.push(file.objectURL);
    }
  }


  onSubmit(){
    let userId = localStorage.getItem('userId');
    const images: File[] = this.dataServive.getuploadPictureData();

    const vehicleData = new FormData();
    vehicleData.append("userId", userId || '1');
    vehicleData.append("model", this.carData.basicInfo.model);
    vehicleData.append("make", this.carData.basicInfo.make);
    vehicleData.append("price", this.carData.basicInfo.price);
    vehicleData.append("location", this.carData.basicInfo.location);
    vehicleData.append("yearOfManufactor", this.carData.basicInfo.yearOfManufacture);
    vehicleData.append("mileage", this.carData.basicInfo.mileage);
    for (let i = 0; i < images.length; i++) {
      vehicleData.append('images', images[i]);
    }
    // vehicleData.append("images", this.dataServive.getuploadPictureData());
    vehicleData.append("color", this.carData.carDetails.color);
    vehicleData.append("condition", this.carData.carDetails.steering);
    vehicleData.append("transmission", this.carData.carDetails.transmission);
    vehicleData.append("engineSize", this.carData.carDetails.engineSize);
    vehicleData.append("vehicleType", this.carData.carDetails.vehicleType);
    vehicleData.append("foreignUsed", true.toString());
    vehicleData.append("localUsed", false.toString());
    // vehicleData.append("additionalFeatures", [this.carData.carDetails.drivetype,
    //                                   this.carData.carDetails.description,
    //                                   this.carData.carDetails.fueltype].toString());

    console.log("final -> ", vehicleData)

    this.ds.createVehicle(vehicleData).subscribe(response => {
      console.log('Vehicle Uploaded successfully!', response);
      this.vehicle = response

      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:'Please wait for our team to verify your vehicle'
      })
      timer(2500).toPromise().then(()=>{
        this.router.navigate(['/'])
      })
    },
    error => {
      console.error('Failed to upload vehicle:', error);
      // Handle error response here
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Failed to upload vehicle'
      })
      }
    );
  }

}
