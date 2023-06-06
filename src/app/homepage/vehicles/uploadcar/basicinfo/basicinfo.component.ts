import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.scss']
})
export class BasicinfoComponent implements OnInit {
  cities!: City[];

  selectedCity!: City;
  constructor() { }

  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }

}
