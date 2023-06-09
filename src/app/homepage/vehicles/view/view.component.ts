import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private ds:DataStorageService) { }
  items!: MenuItem[];
  vehicleId!:string;
  vehicle:any;
  activeItem!: MenuItem;

  ngOnInit() {
    //   this.items = Array.from({ length: 8 },() => ({
    //     label: `Engine`
    // }
    //   ));
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
      this.getSingleVehicle()
  }

  getAllVehicles(){
    this.ds.getVehicles().subscribe(
      (vehicles) => {
        console.log(vehicles);
        console.log(vehicles.vehicles);
        console.log(vehicles.vehicles.color);

        // this.vehicle = vehicles.vehicles;

      },
      (error) => {
        console.error(error);
      }
    );
  }
  getSingleVehicle(){
    this.ds.getVehicle(this.vehicleId).subscribe(
      (vehicle) => {
        console.log(vehicle);
        // console.log(vehicle.vehicle);
        // console.log(vehicle.vehicle.color);

        // this.vehicles = vehicle.vehicle;

      },
      (error) => {
        console.error(error);
      }
    );
  }

  // filterByUserId(vehicleId:string) {
  //   return this.vehicles?.filter?.((vehicle: { vehicleId: string; }) => vehicle.vehicleId === vehicleId);
  // }
}
