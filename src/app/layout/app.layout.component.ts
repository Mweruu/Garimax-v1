import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnInit{

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  // this.router.navigate(['/vehicles'])
  }

}
