import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { DataStorageService } from '../datastorage.service';
import { VehiclesComponent } from '../homepage/vehicles/vehicles.component';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    username:any;
    items!: MenuItem[];
    overlayVisible: boolean = false;
    loggedin = false;
    searchData: any[] = []; // This array will hold the search results
    vehicles:any;
    searchText:any;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                public ds: DataStorageService,
                private authService: AuthService,

                ) { }

    ngOnInit(){
      this.getUsersCreds();
    }

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    getUsersCreds(){
      const userData = this.authService.getUserCredentials()
      this.username = userData.name;
      console.log('User Data:',userData);
    }

    logOut() {
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      window.location.reload();
    }


  //   getAllVehicles(){
  //     return new Promise((resolve, reject) => {

  //     this.ds.getVehicles().subscribe(
  //       (vehicles) => {
  //         console.log(vehicles);
  //         console.log(vehicles.vehicles);
  //         this.vehicles = vehicles.vehicles;
  //         console.log(this.vehicles);
  //         resolve( this.vehicles)
  //       },
  //       (error) => {
  //         console.error(error);
  //         reject(error);

  //       }
  //     );
  //   });
  // }

  // async onSearch(event:any) {
  //     const searchValue = event.target; // Retrieve the search value from the event

  //     try {
  //       await this.getAllVehicles();
  //       // Perform your search logic here
  //       // You can make API calls, filter data, etc.
  //       // For demonstration purposes, let's assume we have an array of data called 'tableData'
  //       console.log("sdfcghtfyuhjnhereee", this.vehicles);
  //       this.searchData = this.vehicles.filter((item: any) =>
  //         // item.make.toLowerCase().includes(searchValue.toLowerCase())
  //         item && item.make && item.make.toLowerCase()
  //         );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
}
