import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadcarComponent } from '../uploadcar.component';

@Component({
  selector: 'app-uploadpicture',
  templateUrl: './uploadpicture.component.html',
  styleUrls: ['./uploadpicture.component.scss']
})
export class UploadpictureComponent implements OnInit {
  uploadedFiles: any[] = [];
  imageForm!:FormGroup;
  isSubmitted = false;
  vendor:any;

  constructor(private messageService: MessageService,
              private fb:FormBuilder,
              private router:Router,
              // private carupload: UploadcarComponent
              ) { }

  ngOnInit(){
    this.imageForm= this.fb.group({
      image:['',Validators.required],
    })
  }

  onUpload(event: { files: any; }) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

  onSubmit(){
    console.log('gothere!')
    // this.router.navigate(['/cardetails'])
    this.isSubmitted = true;
    // if(this.imageForm.invalid){
    //   // this.router.navigate(['/cardetails'])
    //   return;
    // }else{
    //   this.router.navigate(['/cardetails'])
    // }

    const image = {
      image:this.imageUpload['image'].value
    }
    // this.carupload.uploadcar(this.vendor)
    console.log('andgothere!')

  }

  get imageUpload(){
    return this.imageForm.controls;
  }
}
