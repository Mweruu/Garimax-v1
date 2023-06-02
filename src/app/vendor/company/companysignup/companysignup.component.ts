import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-companysignup',
  templateUrl: './companysignup.component.html',
  styleUrls: ['./companysignup.component.scss']
})
export class CompanysignupComponent implements OnInit {
  valCheck: string[] = ['remember'];
  formGroup!: FormGroup;

  password!: string;
  constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      dealerLicense: new FormControl<string | null>(null)
  });
  }

}
