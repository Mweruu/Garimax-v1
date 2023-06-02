import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-individuallogin',
  templateUrl: './individuallogin.component.html',
  styleUrls: ['./individuallogin.component.scss']
})
export class IndividualloginComponent implements OnInit {

  valCheck: string[] = ['remember'];

  password!: string;
  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
  }

}
