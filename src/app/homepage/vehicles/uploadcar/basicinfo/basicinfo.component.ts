import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/datastorage.service';
import { CAR_MODELS, KENYA_LOCATION, TRANSMISSION, VEHICLE_DATA } from 'src/app/homepage/const-data/constants';
import { DataService } from 'src/app/layout/data.service';


@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.scss']
})
export class BasicinfoComponent implements OnInit {
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
  updateMode = false;

  constructor( private fb:FormBuilder,
               private router: Router,
               private ds:DataStorageService,
               private dataServive: DataService,
               private activatedRoute: ActivatedRoute) {
    }

  ngOnInit(){
    this._checkUpdateMode()

    console.log(this.minDate, this.maxDate)

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

  onSubmit(){
    console.log('gothere!')
    this.isSubmitted = true;
    if(this.basicInfoForm.invalid){
      return;
    }else{
      this.router.navigate([`/uploadpicture`])
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



  updateVehicle(id: string){
    this.router.navigateByUrl(`uploadpicture/${id}`)
  }

  private _checkUpdateMode(){
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

          this.informationForm['make'].setValue(vehicle?.make)
          this.informationForm['model'].setValue(vehicle?.model)
          this.informationForm['yearOfManufacture'].setValue(vehicle?.yearOfManufacture)
          this.informationForm['price'].setValue(vehicle.price)
          this.informationForm['location'].setValue(vehicle.location)
          this.informationForm['mileage'].setValue(vehicle.mileage)
          this.informationForm['transmission'].setValue(vehicle.transmission)

        });
      }
    });
  }


  get informationForm(){
    return this.basicInfoForm.controls;
  }
}
