import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ACCELERATION, BODY_TYPE, BOOTSPACE, CAR_MODELS, CAR_OPTIONS, COLOR, CONDITION, DOORS, DRIVETRAIN, ENGINE_POWER, ENGINE_SIZE, FUEL_CONSUMPTION, FUEL_TYPE, KENYA_LOCATION, MILEAGE, PRICE, SEATS, STEERING, TRANSMISSION } from '../const-data/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { DataStorageService } from 'src/app/datastorage.service';
import {FilterService} from 'primeng/api';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  cities!: City[];
  selectedCity!: City;
  makes:string[] =Object.keys(CAR_MODELS);
  models: string[] = [];
  selectedMake: string = '';
  selectedModel: string = '';
  filtersForm!:FormGroup
  isSubmitted = false;
  vendor:any;
  location:any = KENYA_LOCATION;
  options: any[] = CAR_OPTIONS;
  color: any = COLOR;
  fuelType:any = FUEL_TYPE;
  bodyType:any = BODY_TYPE;
  engineSize:any = ENGINE_SIZE;
  steering:any = STEERING;
  gear:any = TRANSMISSION;
  driveTrain:any = DRIVETRAIN;
  mileage:any = MILEAGE;
  price:any = PRICE
  seats:any = SEATS;
  doors:any = DOORS;
  bootSpace:any = BOOTSPACE;
  acceleration:any = ACCELERATION;
  fuelConsumption:any = FUEL_CONSUMPTION;
  enginePower:any = ENGINE_POWER;
  showMore: boolean = false;
  searchTextProperty:any;
  date!: Date;
  date1!: Date;
  enteredFilter:any;
  states = [{condition:"Verified" , key:"v",},{condition:"Not Verified", key:"nv"}];
  uses = [{use:"Kenyan used", key:"KU"},{use:"Foreign used", key:"FU"}];
  conditions:any[] = CONDITION;
  vehicles:any;
  checked: boolean = false;
  modelFilter:any;
  makeFilter:any;
  mileageFilter:any;
  priceFilter:any;
  maxPriceFilter:any;
  minPriceFilter:any;
  yearFilter:any;
  bodyTypeFilter:any;
  transmissionFilter:any;
  fuelConsumptionFilter:any;
  fuelTypeFilter:any;
  colorFilter:any;
  bootSpaceFilter:any;
  doorsFilter:any;
  seatsFilter:any;
  accelerationFilter:any;
  driveTrainFilter:any;
  filteredNumbers!: number[];

  @Output()
  searchFilterChanged:EventEmitter<string>=new EventEmitter<string>();


  constructor( private fb:FormBuilder,
               private router: Router,
               private dataServive: DataService,
               private ds:DataStorageService,
               private filterService: FilterService,
               ) { }

  ngOnInit(){
    this.filtersForm= this.fb.group({
      make:['',Validators.required],
      model:['',Validators.required]

    })

  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  onMakeChange(){
    console.log("Got here!")
    const make = this.filtersForm.value.make;
    console.log(make)

    this.models = CAR_MODELS[make] || [];
    console.log(this.models)
    this.filtersForm.patchValue({ model: '' });
  }

  get informationForm(){
    return this.filtersForm.controls;
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

  applyFilter() {
    this.filteredNumbers = this.vehicles.filter((vehicle: { price: number; }) => {
      if (this.minPriceFilter&& vehicle.price < this.minPriceFilter) {
        return false; // Exclude numbers below the minimum value
      }
      if (this.maxPriceFilter && vehicle.price > this.maxPriceFilter) {
        return false; // Exclude numbers above the maximum value
      }
      return true; // Include numbers within the selected range
    });
  }
  onSearchFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  onModelFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  onMakeFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  onMileageFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  // onMinPriceFilterChanged(selectedFilter:string){
  //   this.searchFilterChanged.emit(selectedFilter)
  //   console.log("ef",selectedFilter)
  // }
  onMaxPriceFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  onPriceFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  // onYearFilterChanged(selectedFilter:string){
  //   this.searchFilterChanged.emit(selectedFilter)
  //   console.log("ef",selectedFilter)
  // }
  onBodyTypeFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

  onTransmissionFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

  onAccelerationFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  onFuelTypeFilterChanged(selectedFilter:string){
      this.searchFilterChanged.emit(selectedFilter)
      console.log("ef",selectedFilter)
    }

  onFuelConsumptionFilterChanged(selectedFilter:string){
      this.searchFilterChanged.emit(selectedFilter)
      console.log("ef",selectedFilter)
    }

  onColorFilterChanged(selectedFilter:string){
      this.searchFilterChanged.emit(selectedFilter)
      console.log("ef",selectedFilter)
    }

  onBootSpaceFilterChanged(selectedFilter:string){
      this.searchFilterChanged.emit(selectedFilter)
      console.log("ef",selectedFilter)
    }

  onDoorsFilterChanged(selectedFilter:string){
      this.searchFilterChanged.emit(selectedFilter)
      console.log("ef",selectedFilter)
    }

  onSeatsFilterChanged(selectedFilter:string){
      this.searchFilterChanged.emit(selectedFilter)
      console.log("ef",selectedFilter)
    }

  onDriveTrainFilterChanged(selectedFilter:string){
      this.searchFilterChanged.emit(selectedFilter)
      console.log("ef",selectedFilter)
    }

  clear(){
    window.location.reload();
  }
}
