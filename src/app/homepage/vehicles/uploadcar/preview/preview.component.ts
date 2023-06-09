import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  sidebarVisible3!: boolean;
  previewForm!:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.previewForm = this.fb.group({
      make:['',Validators.required],
      model:['',Validators.required],
      yearOfManufacture:['',Validators.required],
      price:['',Validators.required],
      location:['',Validators.required],
      mileage:['',Validators.required],
      image:['',Validators.required],
      fueltype:['', Validators.required],
      vehicleType:['', Validators.required],
      transmission:['', Validators.required],
      color:['', Validators.required],
      steering:['', Validators.required],
      engineSize:['', Validators.required],
      drivetype:['',Validators.required],
      description:['']
    })
  }

}
