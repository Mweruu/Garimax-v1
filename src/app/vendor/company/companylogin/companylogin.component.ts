import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-companylogin',
  templateUrl: './companylogin.component.html',
  styleUrls: ['./companylogin.component.scss']
})
export class CompanyloginComponent implements OnInit {

  valCheck: string[] = ['remember'];

  password!: string;
  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
  }

}
