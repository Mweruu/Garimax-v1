import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { DataStorageService } from 'src/app/datastorage.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  sidebarVisible3!: boolean;
  carData: any;

  constructor(private dataServive: DataService,
              private messageService: MessageService,
              private router: Router,
              private ds: DataStorageService) { }

  async ngOnInit(): Promise<void> {
    this.carData = {
      "basicInfo": this.dataServive.getbasicInfoData(),
      "images": this.dataServive.getuploadPictureData(),
      "carDetails": this.dataServive.getcardetailsData()
    }
    console.log(this.carData)
    this.onSubmit()
  }
  // userId: req.body.userId,
  // model: req.body.model,
  // image: imagePath,
  // images: imagesPaths,
  // make: req.body.make,
  // location: req.body.location,
  // price: req.body.price,
  // yearOfManufactor: req.body.yearOfManufactor,
  // color: req.body.color,
  // vehicleType: req.body.vehicleType,
  // condition: req.body.condition,
  // transmission: req.body.transmission,
  // engineSize: req.body.engineSize,
  // mileage: req.body.mileage,
  // foreignUsed: req.body.foreignUsed,
  // localUsed: req.body.localUsed,
  // additionalFeatures: req.body.additionalFeatures

  onSubmit(){
    const vehicleData:any = {
      userId: 1,
      model: this.carData.basicInfo.model,
      make: this.carData.basicInfo.make,
      price: this.carData.basicInfo.price,
      location: this.carData.basicInfo.location,
      yearOfManufactor: this.carData.basicInfo.yearOfManufacture,
      mileage: this.carData.basicInfo.mileage,
      images: this.dataServive.getuploadPictureData(),
      color: this.carData.carDetails.color,
      condition: this.carData.carDetails.steering,
      transmission: this.carData.carDetails.transmission,
      engineSize: this.carData.carDetails.engineSize,
      foreignUsed: true,
      localUsed: false,
      vehicleType: this.carData.carDetails.vehicleType,
      additionalFeatures: [this.carData.carDetails.drivetype,
                          this.carData.carDetails.description,
                          this.carData.carDetails.fueltype]
    }
    console.log("final -> ", vehicleData)

    this.ds.createVehicle(vehicleData).subscribe(response => {
      console.log('Vehicle Uploaded successfully!', response);
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
