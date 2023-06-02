import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  valCheck: string[] = ['remember'];

  password!: string;
  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
  }

}
