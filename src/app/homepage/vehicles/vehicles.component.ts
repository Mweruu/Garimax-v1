import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../datastorage.service';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  value: number | undefined;
  panelSizes = [30,70]
  vendor:any;
  vehicle!:string;
  vehicles:any;
  searchText:any;

  constructor(
    private ds:DataStorageService,
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
        this.vehicles = vehicles.vehicles;

      },
      (error) => {
        console.error(error);
      }
    );
  }

}
