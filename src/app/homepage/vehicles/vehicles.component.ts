import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatastorageserviceService } from '../../datastorage.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  formGroup!: FormGroup;
  value: number | undefined;
  panelSizes = [30,70]
  vendor:any;
  vehicle!:string;
  vehicles:any;

  constructor(
    private ds:DatastorageserviceService
  ) { }

  ngOnInit() {
    this.value = 4;
    this._setValues();
    this.getAllVehicles()
  }

  _setValues(){
    this.panelSizes = [33, 67]
  }

  getAllVehicles(){
    this.ds.getVehicles().subscribe(
      (vehicles) => {
        console.log(vehicles);
        console.log(vehicles.vehicles);
        console.log(vehicles.vehicles.color);

        this.vehicles = vehicles.vehicles;

      },
      (error) => {
        console.error(error);
      }
    );
  }

}