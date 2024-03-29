import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { DataStorageService } from 'src/app/datastorage.service';
import { timer } from 'rxjs';
import { FormGroup } from '@angular/forms';

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
  fuelType!:string;
  bodyType!:string;
  vinNumber!:string;
  transmission!:string;
  color!:string;
  steering!:string;
  enginePower!:string;
  engineSize!:string;
  driveTrain!:string;
  usage!:string;
  acceleration!:string;
  description!:string;
  duty!:string;
  condition!:string;
  isVerified!:boolean;
  accessories:any = [];
  images: string[] =[];
  properties:any[] = [];
  updateMode = false;
  currentVehicleId!:string;
  id:any;
  allCarsData!:FormGroup

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
              private dataService: DataService,
              private messageService: MessageService,
              private router: Router,
              private ds: DataStorageService,
              private activatedRoute:ActivatedRoute
              ) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(params => {
      if(params['vehicleId']){
        this.updateMode = true
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          // console.log("DATA", vehicle.images)
          console.log(vehicle.id, vehicle)
          this.id = vehicle.id
          // this.carDataForm['make'].setValue(vehicle?.make)
          // this.carDataForm['model'].setValue(vehicle?.model)
          // this.carDataForm['yearOfManufacture'].setValue(vehicle?.yearOfManufacture)
          // this.carDataForm['price'].setValue(vehicle.price)
          // this.carDataForm['location'].setValue(vehicle.location)
          // this.carDataForm['mileage'].setValue(vehicle.mileage)
          // this.carDataForm['transmission'].setValue(vehicle.transmission)
          // this.carDataForm['fuelType'].setValue(vehicle.fuelType)
          // this.carDataForm['bodyType'].setValue(vehicle.bodyType)
          // this.carDataForm['color'].setValue(vehicle.color)
          // this.carDataForm['steering'].setValue(vehicle.steering)
          // this.carDataForm['engineSize'].setValue(vehicle.engineSize)
          // this.carDataForm['enginePower'].setValue(vehicle.enginePower)
          // this.carDataForm['vinNumber'].setValue(vehicle.vinNumber)
          // this.carDataForm['usage'].setValue(vehicle.usage)
          // this.carDataForm['duty'].setValue(vehicle.duty)
          // this.carDataForm['condition'].setValue(vehicle.condition)
          // this.carDataForm['acceleration'].setValue(vehicle.acceleration)
          // this.carDataForm['description'].setValue(vehicle.description)

        });
      }
      });
    this.carData = {
      "basicInfo": this.dataService.getbasicInfoData(),
      "images": this.dataService.getuploadPictureData(),
      "carDetails": this.dataService.getcardetailsData()
    }
    if(this.carData.images){
      this.processImageFiles(this.carData.images)
      console.log(this.images);
    }
    if(this.carData.basicInfo){
      this.make = this.carData.basicInfo.make;
      this.model = this.carData.basicInfo.model;
      this.year = this.carData.basicInfo.yearOfManufacture.toString().split(' ')[3];
      this.price =this.carData.basicInfo.price,
      this.location = this.carData.basicInfo.location;
      this.mileage = this.carData.basicInfo.mileage;
      this.transmission = this.carData.basicInfo.transmission;

    }
    // this.fuelType = this.carData.carDetails.fuelType;
    if(this.carData.carDetails){
      this.bodyType = this.carData.carDetails.bodyType;
      this.fuelType = this.carData.carDetails.fuelType;
      this.vinNumber = this.carData.carDetails.vinNumber;
      this.usage = this.carData.carDetails.usage;
      this.color = this.carData.carDetails.color;
      this.acceleration = this.carData.carDetails.acceleration;
      this.engineSize = this.carData.carDetails.engineSize;
      this.enginePower = this.carData.carDetails.enginePower;
      this.driveTrain = this.carData.carDetails.driveTrain;
      this.description = this.carData.carDetails.description;
      this.steering = this.carData.carDetails.steering;
      this.duty = this.carData.carDetails.duty;
      this.condition = this.carData.carDetails.condition;
      this.accessories = this.carData.carDetails.accessories;
      this.isVerified = false
    }


  }

  processImageFiles(files: any[]): void {
    for (const file of files) {
      this.images.push(file.objectURL);
    }
  }


  onSubmit(){
    let userId = localStorage.getItem('userId');
    const images: File[] = this.dataService.getuploadPictureData();
    console.log(8888888,images)
    const vehicleData = new FormData();
    vehicleData.append("userId", userId || '1');
    vehicleData.append("model", this.carData.basicInfo.model);
    vehicleData.append("make", this.carData.basicInfo.make);
    vehicleData.append("price", this.carData.basicInfo.price);
    vehicleData.append("location", this.carData.basicInfo.location);
    vehicleData.append("yearOfManufacture", this.carData.basicInfo.yearOfManufacture);
    vehicleData.append("mileage", this.carData.basicInfo.mileage);
    vehicleData.append("transmission", this.carData.basicInfo.transmission);
    for (let i = 0; i < images.length; i++) {
      vehicleData.append('images', images[i]);
    }
    // vehicleData.append("images", this.dataServive.getuploadPictureData());
    vehicleData.append("color", this.carData.carDetails.color);
    // vehicleData.append("condition", this.carData.carDetails.steering);
    vehicleData.append("engineSize", this.carData.carDetails.engineSize);
    vehicleData.append("bodyType", this.carData.carDetails.bodyType);
    vehicleData.append("fuelType", this.carData.carDetails.fuelType);
    vehicleData.append("enginePower", this.carData.carDetails.enginePower);
    vehicleData.append("vinNumber", this.carData.carDetails.vinNumber);
    vehicleData.append("acceleration", this.carData.carDetails.acceleration);
    vehicleData.append("usage", this.carData.carDetails.usage);
    vehicleData.append("description", this.carData.carDetails.description);
    vehicleData.append("steering", this.carData.carDetails.steering);
    vehicleData.append("duty", this.carData.carDetails.duty);
    vehicleData.append("condition", this.carData.carDetails.condition);
    vehicleData.append("accessories", this.carData.carDetails.accessories);

    // vehicleData.append("additionalFeatures", [this.carData.carDetails.driveTrain,
    //                                   this.carData.carDetails.description,
    //                                   this.carData.carDetails.fuelType].toString());

    console.log("final -> ", vehicleData)
    if(this.updateMode){
      console.log(this.id)
      this.vehicle.isVerified = false
      this._updateInfo(this.id,vehicleData)
    }else{
      this._createInfo(vehicleData)
    }

  }

  private _updateInfo(id: string,vehicleData:any){
    console.log("Gothere5678")
    this.ds.updateVehicle(id,vehicleData).subscribe(response => {
      console.log('Vehicle Updated successfully!', response);
      this.vehicle = response

      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:'Please wait for our team to verify your updated vehicle'
      })
      timer(2500).toPromise().then(()=>{
        this.router.navigate(['/vehicles'])
      })
    },
    error => {
      console.error('Failed to update vehicle:', error);
      // Handle error response here
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Failed to update vehicle'
      })
      }
    );
    this.router.navigate(['/vehicles'])

  }

  private _createInfo(vehicleData:any){
    this.ds.createVehicle(vehicleData).subscribe(response => {
      console.log('Vehicle Uploaded successfully!', response);
      this.vehicle = response

      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:'Please wait for our team to verify your vehicle'
      })
      timer(2500).toPromise().then(()=>{
        localStorage.removeItem('formData');

        this.router.navigate(['/vehicles'])
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
    this.router.navigate([`/vehicles`])

  }

  back(id: string){
    if(this.updateMode){
    this.router.navigateByUrl(`uploadcar/cardetails/${id}`);
    }else{
      this.router.navigateByUrl(`/uploadcar/cardetails`);

    }
  }

  get carDataForm(){
    return this.allCarsData.controls;
  }
}
