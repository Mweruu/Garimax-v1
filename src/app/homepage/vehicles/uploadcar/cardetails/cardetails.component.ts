import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {
    cities!: City[];
    selectedCategories: any[] = [];
    formGroup!: FormGroup;

    selectedCity!: City;
    constructor() { }

    ngOnInit(){
      this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    this.formGroup = new FormGroup({
      text: new FormControl<string | null>(null)
  });
    }

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' },
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' },
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' },
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' },
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' },

    ];

}
