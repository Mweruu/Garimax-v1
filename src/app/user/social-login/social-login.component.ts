import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html'
})
export class SocialLoginComponent implements OnInit {
  valCheck: string[] = ['remember'];

  password!: string;
  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
  }
}
