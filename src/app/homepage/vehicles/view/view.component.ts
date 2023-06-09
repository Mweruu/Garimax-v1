import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor() { }
  items!: MenuItem[];

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
  }


}
