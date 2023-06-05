import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatastorageserviceService } from 'src/app/datastorage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-companylogin',
  templateUrl: './companylogin.component.html',
  styleUrls: ['./companylogin.component.scss']
})
export class CompanyloginComponent implements OnInit {
  loginForm!:FormGroup;
  valCheck: string[] = ['remember'];
  isSubmitted = false;
  company = { email:'', password:'' };
  password!: string;
  constructor(public layoutService: LayoutService,
              private fb:FormBuilder,
              private ds: DatastorageserviceService,
              private router: Router,
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
      email:['', Validators.required],
      // companyName:['', Validators.required],
      password:['', Validators.required]
    });
  }


  companyLogin(email: string, companyName:string, password: string){
    this.isSubmitted = true;

    if(this.loginForm.invalid){
      return;
    }
    const company={
      email:email,
      companyName:companyName,
      password:password,
    }

    this.ds.userLogin(company).subscribe(
      response => {
        console.log('User authenticated', response);
        console.log(response.message)
        // Handle success response here
        if(response.message == "Wrong credentials, confirm password/email" ){
          return;
        }
        else{
          this.router.navigate(['/']);}
      },
      error => {
        console.error('User not found:', error);
        console.log(error.error.error)
      }
    );

  }
}
