import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { DataStorageService } from '../datastorage.service';
import { VehiclesComponent } from '../homepage/vehicles/vehicles.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    username:any;
    items!: MenuItem[];
    overlayVisible: boolean = false;
    loggedin = false;
    searchData: any[] = []; // This array will hold the search results
    vehicles:any;


    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                public ds: DataStorageService,
                public allVehicles:VehiclesComponent
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

    getAllVehicles(){
      return new Promise((resolve, reject) => {

      this.ds.getVehicles().subscribe(
        (vehicles) => {
          console.log(vehicles);
          console.log(vehicles.vehicles);
          this.vehicles = vehicles.vehicles;
          console.log(this.vehicles);
          resolve( this.vehicles)
        },
        (error) => {
          console.error(error);
          reject(error);

        }
      );
    });
  }

  async onSearch(event:any) {
      const searchValue = event.target; // Retrieve the search value from the event

      try {
        await this.getAllVehicles();
        // Perform your search logic here
        // You can make API calls, filter data, etc.
        // For demonstration purposes, let's assume we have an array of data called 'tableData'
        console.log("sdfcghtfyuhjnhereee", this.vehicles);
        this.searchData = this.vehicles.filter((item: any) =>
          // item.make.toLowerCase().includes(searchValue.toLowerCase())
          item && item.make && item.make.toLowerCase()
          );
      } catch (error) {
        console.error(error);
      }
    }
}
