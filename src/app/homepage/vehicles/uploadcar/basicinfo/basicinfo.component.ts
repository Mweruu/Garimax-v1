import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor( private fb:FormBuilder,
               private router: Router,
               private dataServive: DataService) { }

  ngOnInit(){
    this.basicInfoForm= this.fb.group({
      make:['',Validators.required],
      model:['',Validators.required],
      yearOfManufacture:['',Validators.required],
      price:['',Validators.required],
      location:['',Validators.required],
      mileage:['',Validators.required],
      transmission:['', Validators.required],
    })
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
      this.router.navigate(['/uploadpicture'])
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
  }

  get informationForm(){
    return this.basicInfoForm.controls;
  }

}
