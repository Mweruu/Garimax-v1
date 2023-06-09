import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { DataStorageService } from 'src/app/datastorage.service';


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
              private fb: FormBuilder,
              private ds: DataStorageService,
              private router:Router,
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


  // uploadcar(vendor:any){
  //   this.ds.createVehicle(vendor).subscribe(response => {
  //       console.log('Vehicle Uploaded successfully!', response);
  //       // Handle success response here
  //       console.log(1123,response.token)
  //       this.messageService.add({
  //         severity:'success',
  //         summary:'Success',
  //         detail:'Please wait for our team to verify your vehicle'
  //       })
  //       timer(2500).toPromise().then(()=>{
  //         this.router.navigate(['/'])
  //       })
  //     },
  //     error => {
  //       console.error('Failed to upload vehicle:', error);
  //       // Handle error response here
  //       this.messageService.add({
  //         severity:'error',
  //         summary:'Error',
  //         detail:'Failed to upload vehicle'
  //       })
  //     }
  //   );
  // }
}
