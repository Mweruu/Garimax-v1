import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../datastorage.service';

@Component({
  selector: 'app-specificuser-vehicles',
  templateUrl: './specificuser-vehicles.component.html',
  styleUrls: ['./specificuser-vehicles.component.scss']
})
export class SpecificuserVehiclesComponent implements OnInit {
  vehicle!:string;
  vehicles:any;
  constructor( private ds:DataStorageService) { }

  ngOnInit(): void {
  }
  getAllVehicles(){
    this.ds.getVehicles().subscribe(
      (vehicles) => {
        console.log(vehicles);
        console.log(vehicles.vehicles);
        this.vehicles = vehicles.vehicles;
        // this.totalRecords = this.vehicles.length;
        console.log(this.vehicles.length)
        // console.log(this.totalRecords)
        // for (const vehicle of this.vehicles) {
        //   this.dates=vehicle.updatedAt
        this.vehicles.sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime();
        });

        console.log(this.vehicles);

        // }
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
