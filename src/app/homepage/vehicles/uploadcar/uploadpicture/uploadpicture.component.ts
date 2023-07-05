import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  constructor(private messageService: MessageService,
              private fb:FormBuilder,
              private router:Router,
              private dataService: DataService
              ) { }

  ngOnInit(){
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

  onSubmit(){
    this.dataService.setuploadPictureData(this.uploadedFiles);
    this.isSubmitted = true
    if(!this.imageUploaded){
      return;
    }else{
      this.router.navigate(['/cardetails'])
    }

  }

  get imageUpload(){
    return this.imageForm.controls;
  }
}
