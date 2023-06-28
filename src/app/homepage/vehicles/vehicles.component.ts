import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../../datastorage.service';
import { ActivatedRoute, Router } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  value: number | undefined;
  panelSizes = [30,70]
  vendor:any;
  // vehicle!:string;
  vehicles:any;
  search:any;
  searchText:string = '';
  searchFilter:string = '';
  first: number = 0;
  rows: number = 2;
  totalRecords:number = 0;
  minPrice:any;
  maxPrice:any;
  dates: string[] = [];
  sortedDates!: string[];
  currentVehicleId!:string;
  vehicle:any;
  userId :any;


  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
];
  // @Output()
  // searchTextChanged:EventEmitter<string>=new EventEmitter<string>();

  // @Output()
  // searchFilterChanged:EventEmitter<string>=new EventEmitter<string>();

  constructor(
    private ds:DataStorageService,
    public router: Router,
    public activatedRouter:ActivatedRoute
  ) { }

  ngOnInit() {
    this.value = 4;
    this._setValues();
    this.getAllVehicles();
    this.getUserId()
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
        this.totalRecords = this.vehicles.length;
        console.log(this.vehicles.length)
        console.log(this.totalRecords)
        // for (const vehicle of this.vehicles) {
        //   this.dates=vehicle.updatedAt
        this.vehicles.sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime();
        });

        // console.log(this.vehicles);
        //  for (const vehicle of this.vehicles) {
        //   this.userId = vehicle.user.id
        //   console.log(this.userId, vehicle.accessories);
        // }
      },
      (error) => {
        console.error(error);
      }
    );

  }

  sortDates() {
    console.log(33233,this.dates);
    this.sortedDates= this.dates
    .map(dateString => new Date(dateString))
    .sort((a, b) => b.getTime() - a.getTime())
    .map(date => date.toISOString());
    console.log(3444,this.sortedDates)
    // return this.dates.sort((a, b) => b.getTime() - a.getTime());

  }
  getVehicle(vehicleId: string){
    this.router.navigateByUrl(`view/${vehicleId}`);
  }

  getUserId(){
    this.activatedRouter.params.subscribe(params => {
      if(params['vehicleId']){
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          console.log("DATA", vehicle.images)
          console.log(vehicle.userId)
          this.userId = vehicle.userId
        });
      }
    });
  }

  getUser(userId: string){
    this.activatedRouter.params.subscribe(params => {
      if(params['vehicleId']){
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          console.log("DATA", vehicle.images)
          console.log(vehicle.userId)
          this.userId = vehicle.userId
        });
      }
    });
    console.log('gothere',this.userId)
    this.router.navigateByUrl(`vendorprofile/${userId}`);
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
    // console.log(vehicle)
    if (this.searchText === '') {
      return this.searchFilter === '' || vehicle.location.toLowerCase().includes(this.searchFilter) ||
      vehicle.transmission.toLowerCase().includes(this.searchFilter) ||
      vehicle.bodyType.toLowerCase().includes(this.searchFilter) ||
      vehicle.model.toLowerCase().includes(this.searchFilter) ||
      vehicle.mileage.toLowerCase().includes(this.searchFilter) ||
      vehicle.make.toLowerCase().includes(this.searchFilter) ||
      (vehicle.price >= this.minPrice &&
        vehicle.price <= this.maxPrice) ||
      vehicle.usage.toLowerCase().includes(this.searchFilter) ||
      // vehicle.foreignUsed.toLowerCase().includes(this.searchFilter) ||
      // vehicle.acceleration.toLowerCase().includes(this.searchFilter) ||
      vehicle.condition.toLowerCase().includes(this.searchFilter) ||
      // vehicle.doors.toLowerCase().includes(this.searchFilter) ||
      vehicle.engineSize.toLowerCase().includes(this.searchFilter) ||
      vehicle.color.toLowerCase().includes(this.searchFilter) ||
      // vehicle.seats.toLowerCase().includes(this.searchFilter) ||
      // vehicle.bootSpace.toLowerCase().includes(this.searchFilter) ||
      vehicle.fuelType.toLowerCase().includes(this.searchFilter)
      // vehicle.fuelConsumption.toLowerCase().includes(this.searchFilter)
      ;


    } else {
      const searchText = this.searchText.toLowerCase();
      return (
        vehicle.make.toLowerCase().includes(searchText) ||
        vehicle.model.toLowerCase().includes(searchText) ||
        vehicle.price.toLowerCase().includes(searchText) ||
        vehicle.yearOfManufacture.toLowerCase().includes(searchText)
      ) && (
        this.searchFilter === '' || vehicle.location.toLowerCase().includes(this.searchFilter)||
        vehicle.make.toLowerCase().includes(this.searchFilter) ||
        vehicle.bodyType.toLowerCase().includes(searchText)


      );
    }
  }

    onPageChange(event: PageEvent) {
      console.log('got here')
        this.first = event.first;
        this.rows = event.rows;
        console.log(this.rows)
    }
}
