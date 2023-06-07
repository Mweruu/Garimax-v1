import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatastorageserviceService } from 'src/app/datastorage.service';
import { CAR_OPTIONS } from '../../../const-data/constants'
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
