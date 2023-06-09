import { Component, OnInit } from '@angular/core';
import { VehiclesComponent } from '../vehicles/vehicles.component';
import { DatastorageserviceService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit {
   vehicles :any;
   filteredVehicles: string[] = [];
   searchText = '';

  constructor(private allVehicles:VehiclesComponent,
    private ds:DatastorageserviceService) { }

  ngOnInit(): void {
    console.log(this.getAllVehicles())
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

  filterVehicles(){
    // console.log("vehiclefilter", this.vehicles)
    if (!this.searchText) {
      return this.vehicles;
    }
    this.filteredVehicles = this.vehicles.filter((vehicle: { make: string; })=>{
      return  vehicle.make.toLowerCase().includes(this.searchText.toLowerCase())
    });

  }
}
