import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { DataStorageService } from '../datastorage.service';
import { VehiclesComponent } from '../homepage/vehicles/vehicles.component';
import { AuthService } from '../auth.service';
import { KENYA_LOCATION } from '../homepage/const-data/constants';
import { Router } from '@angular/router';

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
    enteredSearchValue:any;
    location:any = KENYA_LOCATION;
    enteredFilter:any;
    userId: any;
    users:any;


    @Output()
    searchTextChanged:EventEmitter<string>=new EventEmitter<string>();


    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                public ds: DataStorageService,
                private authService: AuthService,
                private router:Router
                ) { }

    ngOnInit(){
      this.getUsersCreds();
      this.getAllUsers()
    }

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }

    getUsersCreds(){
      const userData = this.authService.getUserCredentials()
      this.username = userData.name;
      this.userId = userData.userId;
      console.log('User Data:',userData);
    }

    logOut() {
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      window.location.reload();
    }

    onSearchTextChanged(){
      this.searchTextChanged.emit(this.enteredSearchValue)
    }

    getUser(userId: string){
      this.router.navigateByUrl(`profile/${userId}`);
    }
 
    getAllUsers(){
      this.ds.getUsers().subscribe(
        (users) => {
          console.log(users);
          console.log(users.users);
          this.users = users.users;
        },
        (error) => {
          console.error(error);
        }
      );
    }
}
