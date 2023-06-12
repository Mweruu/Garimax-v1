import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  items!: MenuItem[];
  vehicle:any;
  activeItem!: MenuItem;
  currentVehicleId!:string;
  fetched = false;

  constructor(private ds:DataStorageService,
              private router: ActivatedRoute,
             ) { }

  async ngOnInit() {
    this.router.params.subscribe(params => {
      if(params['vehicleId']){
        this.currentVehicleId = params['vehicleId'];
        console.log("ID:",this.currentVehicleId)
        this.ds.getVehicle(this.currentVehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
          console.log("DATA", vehicle)
        })
      }
    })






     this.items = [
            { label: 'Inspection Cert', icon: 'pi pi-fw pi-check-circle', },
            { label: 'Engine', icon: 'pi pi-fw pi-check-circle' },
            { label: 'Electricals', icon: 'pi pi-fw pi-check-circle' },
            { label: 'Transmissson & Clutch', icon: 'pi pi-fw pi-check-circle' },
            { label: 'Suspension & Steering', icon: 'pi pi-fw pi-check-circle' },
            { label: 'Test Drive', icon: 'pi pi-check-circle' },
            { label: 'Exterior', icon: 'pi pi-fw pi-check-circle' },
            { label: 'Interior', icon: 'pi pi-fw pi-check-circle' },
            { label: 'Airconditioning System', icon: 'pi pi-fw pi-check-circle'}

        ];
      this.activeItem = this.items[0];
  }

  async getSingleVehicle(vehicleId: string) {
    try {
      const vehicle = await this.ds.getVehicle(vehicleId).toPromise();
      this.vehicle = vehicle;
      this.fetched = true;
    } catch (error) {
      console.error(error);
    }
  }
}
