import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { DataService } from 'src/app/layout/data.service';

@Component({
  selector: 'app-uploadpictureupdate',
  templateUrl: './uploadpictureupdate.component.html',
  styleUrls: ['./uploadpictureupdate.component.scss']
})
export class UploadpictureupdateComponent implements OnInit {
  uploadedFiles: any[] = [];
  imageForm!:FormGroup;
  file: any
  imageUploaded = false;
  isSubmitted = false;
  vendor:any;
  vehicle:any;
  currentVehicleId!:string;
  id:any;

  constructor(private messageService: MessageService,
              private fb:FormBuilder,
              private router:Router,
              private dataService: DataService,
              private ds: DataStorageService,
              private activatedRoute:ActivatedRoute
              ) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      if(params['vehicleId']){
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          // console.log("DATA", vehicle.images)
          console.log(vehicle.id)
          this.id = vehicle.id
        });
      }
    });
    this.imageForm= this.fb.group({
      images: new FormControl(),
    })

  }


  onUpload(event: any) {
    try{
      let count = 0;
      for(let file of event.files) {
        count = count + 1
        this.uploadedFiles.push(file);
      }
      this.file = event.files[0];
      this.imageUploaded = true;
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: `${count} Image(s) uploaded`});
    } catch(err){
      console.log(err)
      this.messageService.add({severity: 'danger', summary: 'Image(s) Upload Failed', detail: `Failed to upload Images`});
    }
  }

  onSubmit(id:string){
    this.dataService.setuploadPictureData(this.uploadedFiles);
    this.isSubmitted = true
    if(!this.imageUploaded){
      return;
    }else{
      this.router.navigateByUrl(`cardetailsupdate/${id}`);
    }
    const imageData = localStorage.getItem('imageData');


  }

  get imageUpload(){
    return this.imageForm.controls;
  }

  getVehicle(id: string){
    this.router.navigateByUrl(`cardetailsupdate/${id}`);
  }

  back(id: string){
    this.router.navigateByUrl(`basicinfoupdate/${id}`);
  }
}