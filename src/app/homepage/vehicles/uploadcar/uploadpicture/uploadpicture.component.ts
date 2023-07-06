import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { DataService } from 'src/app/layout/data.service';

@Component({
  selector: 'app-uploadpicture',
  templateUrl: './uploadpicture.component.html',
  styleUrls: ['./uploadpicture.component.scss']
})
export class UploadpictureComponent implements OnInit {
  uploadedFiles: any[] = [];
  imageForm!:FormGroup;
  file: any
  imageUploaded = false;
  isSubmitted = false;
  vendor:any;
  currentVehicleId!:string;
  vehicle:any;
  id:any;
  updateMode=false;

  constructor(private messageService: MessageService,
              private fb:FormBuilder,
              private router:Router,
              private dataService: DataService,
              private activatedRoute:ActivatedRoute,
              private ds: DataStorageService
              ) { }

  ngOnInit(){
    this.imageForm= this.fb.group({
      images: new FormControl(),
    })
    this.activatedRoute.params.subscribe(params => {
      if(params['vehicleId']){
        this.updateMode = true;
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          console.log("DATA", vehicle.images)
          console.log(vehicle.id, vehicle)
          this.id = vehicle.id
          this.imageUpload['images'].setValue(vehicle.images)
        });
      }
    });
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

  onSubmit(){
    this.dataService.setuploadPictureData(this.uploadedFiles);
    this.isSubmitted = true
    if(!this.imageUploaded){
      return;
    }else{
      // this.router.navigate(['/cardetails'])
    }
    if(this.updateMode){
      this._updateInfo(this.id,this.uploadedFiles)
    }else{
      this._createInfo(this.uploadedFiles)
    }

  }



  private _updateInfo(id: string,uploadedFiles:any){
    this.dataService.setuploadPictureData(uploadedFiles);
    const images=this.dataService.setuploadPictureData(uploadedFiles);

    console.log(8888888,images)

    console.log('Details Data updated' ,uploadedFiles);
    this.router.navigate([`/cardetails/${id}`])

  }

  private _createInfo(uploadedFiles:any){
    this.dataService.setuploadPictureData(uploadedFiles);
    // console.log('Details Data!',details)
    this.router.navigate([`/cardetails`])

  }



  get imageUpload(){
    return this.imageForm.controls;
  }
}
