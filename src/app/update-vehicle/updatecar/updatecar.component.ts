import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { DataStorageService } from 'src/app/datastorage.service';
import { UpdatebasicinfoComponent } from './updatebasicinfo/updatebasicinfo.component';


@Component({
  selector: 'app-updatecar',
  templateUrl: './updatecar.component.html',
  styleUrls: ['./updatecar.component.scss']
})
export class UpdatecarComponent implements OnInit {

  items!: MenuItem[];
  carUploadForm!: FormGroup;
  _activeIndex: number = 1;
  vehicle:any;
  currentVehicleId!:string;
  id:any;


  constructor(public messageService: MessageService,
              private fb: FormBuilder,
              ) {}

  ngOnInit() {
    this.items = [
      {
          label: 'BASIC INFO',
          routerLink: `basicinfoupdate/vehicleId`
      },
      {
          label: 'UPLOAD PICTURE',
          routerLink: `uploadpictureupdate/vehicleId`
      },
      {
          label: 'CAR DETAILS',
          routerLink: `cardetailsupdate/${this.id}`
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
