import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/datastorage.service';
import { BODY_TYPE, CAR_OPTIONS, COLOR, DRIVETRAIN, ENGINE_POWER, FUEL_TYPE, STEERING, TRANSMISSION } from '../../../const-data/constants'
import { Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';


@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {
    selectedOptions: any[] = [];
    options: any[] = CAR_OPTIONS;
    color: any = COLOR;
    fueltype:any = FUEL_TYPE;
    bodytype:any = BODY_TYPE;
    engineSize:any = ENGINE_POWER;
    steering:any = STEERING;
    gear:any = TRANSMISSION;
    drivetrain:any = DRIVETRAIN;
    carDetsForm!: FormGroup;
    isSubmitted = false;
    vendor:any;

    constructor( private ds:DataStorageService,
                private fb:FormBuilder,
                private router:Router,
                private dataService: DataService
      ) { }

    ngOnInit(){
      this.carDetsForm = this.fb.group({
        fueltype:['', Validators.required],
        vehicleType:['', Validators.required],
        transmission:['', Validators.required],
        color:['', Validators.required],
        steering:['', Validators.required],
        engineSize:['', Validators.required],
        drivetype:['',Validators.required],
        description:['']
    });
    }

    onSubmit(){
      this.isSubmitted = true;
      if(this.carDetsForm.invalid){
        return;
      }else{
        this.router.navigate(['/preview'])
      }

      const details = {
        fueltype:this.carDetails['fueltype'].value,
        vehicleType:this.carDetails['vehicleType'].value,
        transmission:this.carDetails['transmission'].value,
        color:this.carDetails['color'].value,
        steering:this.carDetails['steering'].value,
        engineSize:this.carDetails['engineSize'].value,
        drivetype:this.carDetails['drivetype'].value,
        description:this.carDetails['description'].value
      }
      this.dataService.setcardetailsData(details)
      console.log('Details Data!',details)

    }

    onReset(){

    }

    get carDetails(){
      return this.carDetsForm.controls;
    }
}
