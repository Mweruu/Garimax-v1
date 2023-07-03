import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/datastorage.service';
import { CAR_MODELS, KENYA_LOCATION, TRANSMISSION, VEHICLE_DATA } from 'src/app/homepage/const-data/constants';
import { DataService } from 'src/app/layout/data.service';


@Component({
  selector: 'app-updatebasicinfo',
  templateUrl: './updatebasicinfo.component.html',
  styleUrls: ['./updatebasicinfo.component.scss']
})
export class UpdatebasicinfoComponent implements OnInit {
  make: any = VEHICLE_DATA;
  location:any = KENYA_LOCATION;
  gear:any = TRANSMISSION;
  makes:string[] =Object.keys(CAR_MODELS);
  models: string[] = [];
  selectedMake: string = '';
  selectedModel: string = '';
  selectedCity!: any;
  basicInfoForm!:FormGroup
  isSubmitted = false;
  vendor:any;
  vehicle:any;
  currentVehicleId!:string;
  id:any;
  maxDate= new Date();
  minDate= new Date("1973");

  constructor( private fb:FormBuilder,
               private router: Router,
               private ds:DataStorageService,
               private dataServive: DataService,
               private activatedRouter: ActivatedRoute) {
    }

  ngOnInit(){
    console.log(this.minDate, this.maxDate)
    this.activatedRouter.params.subscribe(params => {
      if(params['vehicleId']){
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          console.log("DATA", vehicle.yearOfManufacture)
          console.log(vehicle.id)
          this.id = vehicle.id

          this.basicInfoForm.patchValue({
            make: vehicle.make,
            model:vehicle.model,
            yearOfManufacture:vehicle.yearofManufacture,
            price:vehicle.price,
            location:vehicle.location,
            mileage:vehicle.mileage,
            transmission:vehicle.transmission,
          });
        });
      }
    });
    this.basicInfoForm= this.fb.group({
      make:['',Validators.required],
      model:['',Validators.required],
      yearOfManufacture:['',Validators.required],
      price:['',Validators.required],
      location:['',Validators.required],
      mileage:['',Validators.required],
      transmission:['', Validators.required],
    });
  }


  onMakeChange(): void {
    const make = this.basicInfoForm.value.make;
    this.models = CAR_MODELS[make] || [];
    this.basicInfoForm.patchValue({ model: '' });
  }

  onSubmit(id: string){
    console.log(5346436747843,this.id)

    this.isSubmitted = true;
    if(this.basicInfoForm.invalid){
      return;
    }else{
      this.router.navigateByUrl(`uploadpictureupdate/${id}`);
    }
    const basicInformation = {
      make:this.informationForm['make'].value,
      model:this.informationForm['model'].value,
      yearOfManufacture:this.informationForm['yearOfManufacture'].value,
      price:this.informationForm['price'].value,
      location:this.informationForm['location'].value,
      mileage: this.informationForm['mileage'].value,
      transmission:this.informationForm['transmission'].value,
    }
    this.dataServive.setbasicInfoData(basicInformation);
    console.log('Basic data' ,basicInformation)

    // this.ds.updateVehicle(id ,basicInformation)

  }

  get informationForm(){
    return this.basicInfoForm.controls;
  }

  updateVehicle(id: string){
    const vehicle={}
    this.ds.updateVehicle(id ,vehicle)
  }

  getVehicle(id: string){
    console.log(5346436747843,this.id)
    this.router.navigateByUrl(`uploadpictureupdate/${id}`);
  }

}
