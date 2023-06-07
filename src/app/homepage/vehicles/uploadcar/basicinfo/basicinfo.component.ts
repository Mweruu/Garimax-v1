import { Component, OnInit } from '@angular/core';
import { VEHICLE_DATA } from 'src/app/homepage/const-data/constants';


@Component({
  selector: 'app-basicinfo',
  templateUrl: './basicinfo.component.html',
  styleUrls: ['./basicinfo.component.scss']
})
export class BasicinfoComponent implements OnInit {
  make: any = VEHICLE_DATA;

  selectedCity!: any;
  constructor() { }

  ngOnInit(): void {}

}
