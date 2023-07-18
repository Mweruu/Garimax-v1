import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../../datastorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RangePipe } from 'src/app/range.pipe';
import { PRICE } from '../const-data/constants';
import { FormGroup, FormControl } from '@angular/forms';

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
  vehicles:any;
  search:any;
  searchText:string = '';
  searchFilter:string = '';
  first: number = 0;
  rows: number = 5;
  totalRecords:number = 0;
  minPrice:any;
  maxPrice:any;
  prices:any[] = PRICE
  dates: string[] = [];
  sortedDates!: string[];
  currentVehicleId!:string;
  vehicle:any;
  userId :any;
  currentUserId!:string;
  user:any;
  layout: string = 'list';
  isChecked = true;

  viewForm = new FormGroup({
    assessment:new FormControl(),
  })

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
    public activatedRoute:ActivatedRoute,
    private rangePipe: RangePipe
  ) { }

  ngOnInit() {
    this.value = 4;
    this._setValues();
    this.getAllVehicles();

  }

  _setValues(){
    this.panelSizes = [33, 67]
  }

  getAllVehicles(){
    this.ds.getVehicles().subscribe(
      (vehicles) => {
        console.log(vehicles.vehicles);

        this.vehicles = vehicles.vehicles;
        this.totalRecords = this.vehicles.length;
        this.vehicles.sort((a: { updatedAt: string | number | Date; }, b: { updatedAt: string | number | Date; }) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime();
        });

        for (const vehicle of this.vehicles) {
          this.vehicle = vehicle;
          this.userId = vehicle.user.id;
          // console.log(vehicle.assessment);
          // console.log(this.vehicle.id,this.vehicle.accessories)
          // console.log("assessment",this.vehicle.assessment)
          const selectedAccessories = vehicle.accessories.map((accessory: any, index: number) => {
            if (index === 0) {
              return null; // Skip the empty string at the beginning of the array
            }
            return { select: true, name: accessory };
          }).filter((accessory: null) => accessory !== null);

          // console.log("accessory",selectedAccessories,);

          let assessment = this.vehicle.assessment
          this.viewForm.patchValue(assessment)
        }
      },
      (error) => {
        console.error(error);
      }
    );

  }

  getVehicle(vehicleId: string){
    this.router.navigateByUrl(`view/${vehicleId}`);

  }

  getUser(userId: string){
    this.router.navigateByUrl(`vendorprofile/${userId}`);
  }

  getUserVehicles(userId: any){
    this.router.navigateByUrl(`vehicles/${userId}`);
    console.log('gothere')
  }

  onSearchTextEntered(searchValue:string){
    this.searchText =searchValue;
    console.log(1,this.searchText)
  }

  onSearchFilterEntered(filterValue:string){
      this.searchFilter = filterValue.toLowerCase();
      console.log("sf",this.searchFilter)
  }

  isMatched(vehicle: any) {
    // console.log(vehicle)
    if (this.searchText === '') {
      return this.searchFilter === '' ||
      vehicle.location.toLowerCase().includes(this.searchFilter) ||
      vehicle.model.toLowerCase().includes(this.searchFilter) ||
      vehicle.make.toLowerCase().includes(this.searchFilter)||
      vehicle.location.toLowerCase().includes(this.searchFilter) ||
      vehicle.mileage.toLowerCase().includes(this.searchFilter) ||
      vehicle.price.toLowerCase().includes(this.searchFilter) ||
      vehicle.bodyType.toLowerCase().includes(this.searchFilter) ||
      vehicle.usage.toLowerCase().includes(this.searchFilter) ||
      vehicle.condition.toLowerCase().includes(this.searchFilter) ||
      vehicle.transmission.toLowerCase().includes(this.searchFilter) ||
      vehicle.color.toLowerCase().includes(this.searchFilter) ||
      vehicle.fuelType.toLowerCase().includes(this.searchFilter);
      // this.rangePipe.transform(this.prices, this.minPrice, this.maxPrice);

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
