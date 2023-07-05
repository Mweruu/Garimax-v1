import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../datastorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-specificuser-vehicles',
  templateUrl: './specificuser-vehicles.component.html',
  styleUrls: ['./specificuser-vehicles.component.scss']
})
export class SpecificuserVehiclesComponent implements OnInit {
  // vehicle!:string;
  vehicles:any;
  currentUserId!:string;
  user:any;
  userId:any;
  searchFilter:string = '';
  searchText:string = '';
  currentVehicleId!:string;
  rows: number = 3;
  p: Number = 1;
  vehicle:any;

  constructor( private ds:DataStorageService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) { }

  async ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        if(params['userId']){
          this.currentUserId = params['userId'];
          // this.currentUserId = '1';
          console.log("ID:",this.currentUserId)
          this.ds.getUser(this.currentUserId).subscribe(user => {
            this.user = user;
            this.userId= user.id
            console.log("DATA", this.userId)

          });
          this.ds.getUserVehicle(this.currentUserId).subscribe(vehicles =>{
            this.vehicles = vehicles;
            console.log(2323556,vehicles)
          });

        }
  });
}

getVehicle(vehicleId: string){
  this.router.navigateByUrl(`view/${vehicleId}`);
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
    // (vehicle.price >= this.minPrice &&
    //   vehicle.price <= this.maxPrice) ||
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

  getUser(userId: string){
    this.activatedRoute.params.subscribe(params => {
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

}
