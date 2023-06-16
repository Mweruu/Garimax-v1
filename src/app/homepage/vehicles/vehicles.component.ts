import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../../datastorage.service';
import { Router } from '@angular/router';

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
  search:any;
  searchText:string = '';
  searchFilter:string = '';
  first: number = 0;
  rows: number = 2;
  totalRecords:number = 0;
  // @Output()
  // searchTextChanged:EventEmitter<string>=new EventEmitter<string>();

  // @Output()
  // searchFilterChanged:EventEmitter<string>=new EventEmitter<string>();

  constructor(
    private ds:DataStorageService,
    public router: Router,
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
        this.totalRecords = vehicles.total;
        console.log(this.vehicles.length)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getVehicle(vehicleId: string){
    this.router.navigateByUrl(`view/${vehicleId}`);
  }

  onSearchTextEntered(searchValue:string){
    this.searchText =searchValue ;
    console.log(1,this.searchText)
  }

  onSearchFilterEntered(filterValue:string){
      this.searchFilter = filterValue.toLowerCase();
      console.log(2,this.searchFilter)
  }

  isMatched(vehicle: any): boolean {
    if (this.searchText === '') {
      return this.searchFilter === '' || vehicle.location.toLowerCase().includes(this.searchFilter);
    } else {
      const searchText = this.searchText.toLowerCase();
      return (
        vehicle.make.toLowerCase().includes(searchText) ||
        vehicle.model.toLowerCase().includes(searchText) ||
        vehicle.price.toLowerCase().includes(searchText) ||
        vehicle.yearOfManufactor.toLowerCase().includes(searchText)
      ) && (
        this.searchFilter === '' || vehicle.location.toLowerCase().includes(this.searchFilter)||
        vehicle.make.toLowerCase().includes(this.searchFilter) ||
        vehicle.vehicleType.toLowerCase().includes(searchText)


      );
    }
  }

    onPageChange(event: { first: number; rows: number; }) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
