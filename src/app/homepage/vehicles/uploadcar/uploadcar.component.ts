import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-uploadcar',
  templateUrl: './uploadcar.component.html',
  styleUrls: ['./uploadcar.component.scss']
})
export class UploadcarComponent implements OnInit {

  items!: MenuItem[];
  carUploadForm!: FormGroup;
  _activeIndex: number = 1;

  constructor(public messageService: MessageService,
              private fb: FormBuilder
              ) {}

  ngOnInit() {
    this.items = [
      {
          label: 'BASIC INFO',
          routerLink: 'basicinfo'
      },
      {
          label: 'UPLOAD PICTURE',
          routerLink: 'uploadpicture'
      },
      {
          label: 'CAR DETAILS',
          routerLink: 'cardetails'
      }
  ];
    this.carUploadForm = this.fb.group(
      {
      make:['',Validators.required],
      model:['',Validators.required],
    });

  }
  onSubmit(){
    console.log('gothere!')
  }
//   get activeIndex(): number {
//     return this._activeIndex;
//   }
//   next() {
//     this.activeIndex++;
// }

//   prev() {
//     this.activeIndex--;
// }
}
