import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BODY_TYPE, CAR_MODELS, CAR_OPTIONS, COLOR, DRIVETRAIN, ENGINE_POWER, FUEL_TYPE, KENYA_LOCATION, STEERING, TRANSMISSION } from '../const-data/constants';
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
  fueltype:any = FUEL_TYPE;
  bodytype:any = BODY_TYPE;
  engineSize:any = ENGINE_POWER;
  steering:any = STEERING;
  gear:any = TRANSMISSION;
  drivetrain:any = DRIVETRAIN;
  showMore: boolean = false;
  searchTextProperty:any;
  date!: Date;
  date1!: Date;
  enteredFilter:any;
  states = [{condition:"Verified" , key:"v",},{condition:"Not Verified", key:"nv"}]
  vehicles:any;
  checked: boolean = false;

  @Output()
  searchFilterChanged:EventEmitter<string>=new EventEmitter<string>();

  constructor( private fb:FormBuilder,
               private router: Router,
               private dataServive: DataService,
               private ds:DataStorageService,
               private filterService: FilterService,
               ) { }

  ngOnInit(){
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
    this.filtersForm= this.fb.group({
      make:['',Validators.required],
      model:['',Validators.required],
      yearOfManufacture:['',Validators.required],
      price:['',Validators.required],
      location:['',Validators.required],
      mileage:['',Validators.required],
    })

    const naks = this.filterService.filters.contains(this.vehicles,'Nakuru')
    console.log(naks)
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  onMakeChange(): void {
    const make = this.filtersForm.value.make;
    this.models = CAR_MODELS[make] || [];
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

  onSearchFilterChanged(selectedFilter:string){
    this.searchFilterChanged.emit(selectedFilter)
    console.log("ef",selectedFilter)
  }

}
