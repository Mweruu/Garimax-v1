import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  formGroup!: FormGroup;
  value: number =4 ;

  constructor() { }

  ngOnInit() {
      this.formGroup = new FormGroup({
          value: new FormControl(4)
      });
  }


}
