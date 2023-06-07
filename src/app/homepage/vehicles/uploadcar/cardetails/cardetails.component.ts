import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatastorageserviceService } from 'src/app/datastorage.service';
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
    options: any[] = [];

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

        this.options =
          [
            {"name": "3-Row Seat", "key": "RS" },
            {"name": " A/C ", "key": "AC" },
            {"name": "ABS", "key": "ABS" },
            {"name": "Aero Parts", "key": "AP" },
            {"name": "Aftermarket Alloy Wheels", "key": "AAW" },
            {"name": "Aftermarket Meffler", "key": "AM" },
            {"name": "Aftermarket Speaker", "key": "AS" },
            {"name": "Airbag", "key": "A" },
            {"name": "Alloy Wheels", "key": "AW" },
            {"name": "Always Garaged", "key": "AG" },
            {"name": "AM/FM", "key": "AF" },
            {"name": "Anti-theft System", "key": "ATS" },
            {"name": "Around View Camera ", "key": "AVC" },
            {"name": "Audio System", "key": "AUS" },
            {"name": "Back Camera ", "key": "BC" },
            {"name": "Back Sensor ", "key": "BS" },
            {"name": "Back Tire", "key": "BT" },
            {"name": "Basic Equipment", "key": "BE" },
            {"name": "Bench Seat", "key": "BS" },
            {"name": "Body Kit", "key": "BK" },
            {"name": "Box Truck ", "key": "BTR" },
            {"name": "Bucket Seat", "key": "BKS" }

          ]


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
