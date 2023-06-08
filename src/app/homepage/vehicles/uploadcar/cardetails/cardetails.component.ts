import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatastorageserviceService } from 'src/app/datastorage.service';
import { BODY_TYPE, CAR_OPTIONS, COLOR, ENGINE_POWER, FUEL_TYPE, STEERING, TRANSMISSION } from '../../../const-data/constants'
// import jsonData from 'src/assets/data/carproperties.json';


interface City {
  name: string;
  code: string;
}

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
    enginepower:any = ENGINE_POWER;
    steering:any = STEERING;
    gear:any = TRANSMISSION;

    cities!: City[];
    formGroup!: FormGroup;
    selectedCity!: City;
    constructor( private ds:DatastorageserviceService) { }

    ngOnInit(){
      // this.carOptions()
      // this.options = jsonData.data;

      this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
        ];


    this.formGroup = new FormGroup({
      text: new FormControl<string | null>(null)
    });
    }


    // carOptions(){
    //   // this.ds.getOptions().then(options=>{
    //   //   this.options = options
    //   // });
    //   this.ds.getOptions().subscribe(options =>{
    //     this.options = options
    //   })
    //   console.log(this.options)

    // }

}
