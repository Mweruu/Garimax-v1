import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { DataStorageService } from '../datastorage.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    username:any;
    items!: MenuItem[];
    overlayVisible: boolean = false;
    loggedin = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                public ds: DataStorageService
                ) { }


    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    getUsers(){
      this.ds.getUsers().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
        console.log(error.error.error)
        // this.showAlert(error.error.error)
      }
      );

    }

    authenticated(){
      this.loggedin=true
      this.username = 'Jeff'
    }

}
