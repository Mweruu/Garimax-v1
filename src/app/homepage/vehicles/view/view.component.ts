import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AIRCONDITIONING_SYSTEM, ELECTRICALS, ENGINE, EXTERIOR, INTERIOR, SUSPENSION_STEERING, TESTDRIVE, TRANSMISSION_AND_CLUTCH } from '../../const-data/constants';
import { AuthService } from 'src/app/auth.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  items!: MenuItem[];
  vehicle:any = {};
  activeItem!: MenuItem;
  currentVehicleId!:string;
  fetched = false;
  position: string = 'bottom';
  selectedTab!: string;
  images =[];
  engines:any = ENGINE;
  electricals:any = ELECTRICALS;
  clutches:any = TRANSMISSION_AND_CLUTCH;
  suspensions:any = SUSPENSION_STEERING;
  testdrives:any = TESTDRIVE;
  exteriors:any = EXTERIOR;
  interiors:any = INTERIOR;
  airsystems:any = AIRCONDITIONING_SYSTEM;
  visible: boolean = false;
  contactVisible = false;
  chatVisible =false;
  thumbnailUrl!:string;
  currentUserId!:string;
  user:any;
  userId:any;
  email:any;
  firstName:any;
  phoneNumber:any;
  rating:any;
  value: number = 4;
  assessments:any;
  selectedOptions: {select:boolean, name: string,}[] = [];
  displayCustom: boolean = false;
  activeIndex: number = 0;

  viewForm = new FormGroup({
    assessment:new FormControl(),
  })

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];


  constructor(private ds:DataStorageService,
              private activatedRoute: ActivatedRoute,
              private authService:AuthService
             ) { }

  async ngOnInit() {
    const userData=this.authService.getUserCredentials();
    this.email=userData.email
    this.firstName=userData.name
    this.phoneNumber=userData.phoneNumber

    console.log('User Data:',userData);

    this.activatedRoute.params.subscribe(params => {
      if(params['vehicleId']){
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          console.log("DATA", vehicle)
          console.log("assessment",vehicle.assessment)
          // this.assessments = vehicle.assessment.map((assessment: any) => {
          //   return { value: assessment, checked: true };
          // });
          // this.viewForm.patchValue(vehicle?.assessment)
          const selectedAccessories = vehicle.assessment[0].map((accessory: any, index: number) => {
            if (index === 0) {
              return null; // Skip the empty string at the beginning of the array
            }
            return { select: true, name: accessory };
          }).filter((accessory: null) => accessory !== null);
          this.selectedOptions =selectedAccessories
          console.log("selectedoptions",this.selectedOptions)
          this.images = vehicle.images
        });
      }
      // this.carDetails['assessment'].setValue(vehicle.assessment)
    });
     this.items = [
            { label: 'Inspection Cert', icon: 'pi pi-fw pi-check-circle', command: () => this.selectTab('Inspection Cert')},
            { label: 'Engine', icon: 'pi pi-fw pi-check-circle',command: () => this.selectTab('Engine')},
            { label: 'Electricals', icon: 'pi pi-fw pi-check-circle',command: () => this.selectTab('Electricals') },
            { label: 'Transmissson & Clutch', icon: 'pi pi-fw pi-check-circle',command: () => this.selectTab('Transmissson & Clutch') },
            { label: 'Suspension & Steering', icon: 'pi pi-fw pi-check-circle',command: () => this.selectTab('Suspension & Steering') },
            { label: 'Test Drive', icon: 'pi pi-check-circle',command: () => this.selectTab('Test Drive') },
            { label: 'Exterior', icon: 'pi pi-fw pi-check-circle',command: () => this.selectTab('Exterior') },
            { label: 'Interior', icon: 'pi pi-fw pi-check-circle',command: () => this.selectTab('Interior') },
            { label: 'Airconditioning System', icon: 'pi pi-fw pi-check-circle',command: () => this.selectTab('Airconditioning System')}

        ];
      this.activeItem = this.items[1];
      this.selectTab('Engine')
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  onTabChange(event: any) {
    this.selectedTab = event.index;
  }

  showDialog() {
    console.log(this.assessments)
    this.visible = true;
  }

  showDialogs() {
    this.contactVisible = true;
  }

  showChatDialog() {
    this.chatVisible = true;
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
}

}
