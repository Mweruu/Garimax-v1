import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatastorageserviceService } from 'src/app/datastorage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-companysignup',
  templateUrl: './companysignup.component.html',
  styleUrls: ['./companysignup.component.scss']
})
export class CompanysignupComponent implements OnInit {
  valCheck: string[] = ['remember'];
  signupForm!: FormGroup;
  company = {email:'',companyName:'', kraPin:'', mobile: 0 ,address:'', location:'',password:'',confirmPassword:''}
  signin = false;
  isSubmitted = false;
  password!: string;
  mobileControl = new FormControl('', [Validators.required, Validators.minLength(9)]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(public layoutService: LayoutService,
              private fb:FormBuilder,
              private ds: DatastorageserviceService,
              private router :Router) { }

  ngOnInit(){
    this.signupForm = this.fb.group({
      email:this.emailControl,
      companyName:['' ,Validators.required],
      kraPin:['', Validators.required],
      mobile:this.mobileControl,
      address:['', Validators.required],
      location:['', Validators.required],
      password:this.passwordControl,
      confirmPassword:['', Validators.required],
      dealerLicense:false,

    });

  }
  signUp(){
    this.isSubmitted = true;

    this.ds.createCompanyVendor(this.company).subscribe(
        response => {
          console.log('Vendor created successfully!', response);
          // Handle success response here
          this.router.navigate(['/']);

        },
        error => {
          console.error('Failed to create vendor:', error);
          // Handle error response here
        }
      );

    this.signin = true;
    if(this.signupForm.invalid){
      return;
    }
    alert("Success")

  }

}
