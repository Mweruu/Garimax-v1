import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-individualsignup',
  templateUrl: './individualsignup.component.html',
  styleUrls: ['./individualsignup.component.scss']
})
export class IndividualsignupComponent implements OnInit {
  valCheck: string[] = ['remember'];

  password!: string;
  constructor(public layoutService: LayoutService) { }


  ngOnInit(): void {
  }

}
