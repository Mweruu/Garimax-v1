import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ACCELERATION, BODY_TYPE, BOOTSPACE, CAR_MODELS, CAR_OPTIONS, COLOR, CONDITION, DOORS, DRIVETRAIN, ENGINE_POWER, ENGINE_SIZE, FUEL_CONSUMPTION, FUEL_TYPE, KENYA_LOCATION, MILEAGE, PRICE, SEATS, STEERING, TRANSMISSION, USAGE, VERIFIED } from '../const-data/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';
import { DataStorageService } from 'src/app/datastorage.service';
import {FilterService} from 'primeng/api';
import { RangePipe } from 'src/app/range.pipe';
import { range } from 'rxjs';


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
  prices:any = PRICE;
  seats:any = SEATS;
  doors:any = DOORS;
  bootSpace:any = BOOTSPACE;
  acceleration:any = ACCELERATION;
  fuelConsumption:any = FUEL_CONSUMPTION;
  enginePower:any = ENGINE_POWER;
  condition:any[]=VERIFIED;
  state:any[] = CONDITION;
  usage:any[]= USAGE;
  showMore: boolean = false;
  searchTextProperty:any;
  date!: Date;
  date1!: Date;
  enteredFilter:any;
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
  usageFilter:any;
  stateFilter:any;
  conditionFilter:any;
  filteredNumbers!: number[];
  maxDate= new Date();
  minDate= new Date("1973");
  maxmileageFilter:any;

  @Output()
  searchFilterChanged:EventEmitter<string>=new EventEmitter<string>();


  constructor( private fb:FormBuilder,
               private ds:DataStorageService,
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

  onLocationFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

  onModelFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
    const convertedString = selectedFilter.replace(/[^0-9]/g, '');
    console.log(888,convertedString);
  }

  onMakeFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

  onMileageFilterChanged(selectedFilter:string){
    if(this.mileageFilter && this.maxmileageFilter){
      let range = `${this.mileageFilter.replace(/[^0-9]/g, '')}-${this.maxmileageFilter.replace(/[^0-9]/g, '')}`;
      console.log("ef33",range)
      // range = selectedFilter
      this.searchFilterChanged.emit(selectedFilter)
      return range;

    }
    // this.searchFilterChanged.emit(selectedFilter);
    return selectedFilter;

  }

  // onMinPriceFilterChanged(selectedFilter:string){
  //   this.searchFilterChanged.emit(selectedFilter)
  //   console.log("ef",selectedFilter)
  // }

  // onMileageFilterChanged(selectedFilter:string){
  //   const convertedString = selectedFilter.replace(/[^0-9]/g, '');
  //   this.searchFilterChanged.emit(convertedString)
  //   console.log("ef1=",this.mileageFilter)
  //   console.log("ef1=1",this.maxmileageFilter)
  //   return function(items:any, attr:any,mileageFilter:any, maxmileageFilter:any) {
  //     var range = []
  //         mileageFilter=parseFloat(mileageFilter),
  //         maxmileageFilter=parseFloat(maxmileageFilter);
  //         console.log("gothere")

  //     for (var i=0, l=items.length; i<l; ++i){
  //         var item = items[i];
  //         if(item[attr]<=maxmileageFilter && item[attr]>=mileageFilter){
  //             range.push(item);
  //         }
  //     }
  //     console.log("ef",range)
  //     return range;
  // };
  // }

  // onPriceFilterChanged(selectedFilter:string){
  //   const convertedString = selectedFilter.replace(/[^0-9]/g, '');
  //   this.searchFilterChanged.emit(convertedString)
  //   console.log("ef",convertedString);
  // }

  onPriceFilterChanged(selectedFilter: string) {
    const convertedString = selectedFilter.replace(/[^0-9]/g, '');
    this.searchFilterChanged.emit(convertedString);
    console.log("ef", convertedString);
    console.log("ef1",selectedFilter)

  }

  onYearFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

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

  onUsageFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }
  onStateFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

  onConditionFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

  clear(){
    window.location.reload();
  }

}
