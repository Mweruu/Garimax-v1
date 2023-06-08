import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KENYA_LOCATION, VEHICLE_DATA } from 'src/app/homepage/const-data/constants';
import { UploadcarComponent } from '../uploadcar.component';


@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.scss']
})
export class BasicinfoComponent implements OnInit {
  make: any = VEHICLE_DATA;
  location:any = KENYA_LOCATION;
  selectedCity!: any;
  basicInfoForm!:FormGroup
  isSubmitted = false;
  vendor:any;

  constructor( private fb:FormBuilder,
                private router: Router,
                // private carupload: UploadcarComponent
      ) { }

  ngOnInit(){
    this.basicInfoForm= this.fb.group({
      make:['',Validators.required],
      model:['',Validators.required],
      yearOfManufacture:['',Validators.required],
      price:['',Validators.required],
      location:['',Validators.required],
      mileage:['',Validators.required],
    })
  }

  onSubmit(){
    console.log('gothere!')
    this.isSubmitted = true;
    if(this.basicInfoForm.invalid){
      return;
    }else{
      this.router.navigate(['/uploadpicture'])
    }
    const basicInformation ={
    make:this.informationForm['make'].value,
    model:this.informationForm['model'].value,
    yearOfManufacture:this.informationForm['yearOfManufacture'].value,
    price:this.informationForm['price'].value,
    location:this.informationForm['location'].value,
    mileage: this.informationForm['mileage'].value
    }
    // this.carupload.uploadcar(this.vendor)
    console.log('andgothere!',basicInformation)

  }

  get informationForm(){
    return this.basicInfoForm.controls;
  }
}
