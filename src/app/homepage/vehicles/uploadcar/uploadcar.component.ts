import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-uploadcar',
  templateUrl: './uploadcar.component.html',
  styleUrls: ['./uploadcar.component.scss']
})
export class UploadcarComponent implements OnInit {

  items!: MenuItem[];

  constructor(public messageService: MessageService) {}

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

  }

}
