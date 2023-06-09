import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      image:['',Validators.required],
    })
  }


  onUpload(event: { files: any; }) {
    try{
      let count = 0;
      for(let file of event.files) {
        count = count + 1
        console.log(file)
        this.uploadedFiles.push(file);
      }
      this.imageUploaded = true;
      this.messageService.add({severity: 'info', summary: 'Image(s) Uploaded', detail: `${count} Image(s) uploaded`});
    } catch(err){
      this.messageService.add({severity: 'dagger', summary: 'Image(s) Upload Failed', detail: `Failed to upload Images`});
    }
  }

  onSubmit(){
    const formData = new FormData();
    for(let file of this.uploadedFiles){
      formData.append('images', file.data, file.data.name);
    }
    this.dataService.setuploadPictureData(formData);
    console.log(this.dataService.getuploadPictureData())
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
