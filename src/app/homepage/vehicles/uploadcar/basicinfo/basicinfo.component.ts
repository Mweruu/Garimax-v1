import { Component, OnInit } from '@angular/core';
import { KENYA_LOCATION, VEHICLE_DATA } from 'src/app/homepage/const-data/constants';


@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.scss']
})
export class BasicinfoComponent implements OnInit {
  make: any = VEHICLE_DATA;
  location:any = KENYA_LOCATION;
  selectedCity!: any;
  constructor() { }

  ngOnInit(): void {}

}
