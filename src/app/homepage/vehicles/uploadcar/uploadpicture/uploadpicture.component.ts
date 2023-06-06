import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-uploadpicture',
  templateUrl: './uploadpicture.component.html',
  styleUrls: ['./uploadpicture.component.scss']
})
export class UploadpictureComponent implements OnInit {
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onUpload(event: { files: any; }) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
}
