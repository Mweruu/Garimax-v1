import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  formGroup!: FormGroup;
  value: number | undefined;
  panelSizes = [30,70]

  constructor() { }

  ngOnInit() {
    this.value = 4;
    this._setValues();
  }

  _setValues(){
    this.panelSizes = [33, 67]
  }

}
