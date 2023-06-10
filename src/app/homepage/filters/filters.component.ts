import { Component, OnInit } from '@angular/core';
import { CAR_MODELS } from '../const-data/constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';


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

  constructor( private fb:FormBuilder,
               private router: Router,
               private dataServive: DataService) { }

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
  }

  onMakeChange(): void {
    const make = this.filtersForm.value.make;
    this.models = CAR_MODELS[make] || [];
    this.filtersForm.patchValue({ model: '' });
  }

  get informationForm(){
    return this.filtersForm.controls;
  }



}
