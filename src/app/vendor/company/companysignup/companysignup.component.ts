import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { DatastorageserviceService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-companysignup',
  templateUrl: './companysignup.component.html',
  styleUrls: ['./companysignup.component.scss']
})
export class CompanysignupComponent implements OnInit {
  valCheck: string[] = ['remember'];
  signupForm!: FormGroup;
  company = {email:'',companyName:'', kraPin:'', mobile: '' ,address:'', location:'',password:'',confirmPassword:''}
  signin = false;
  isSubmitted = false;
  password!: string;
  mobileControl = new FormControl('', [Validators.required, Validators.minLength(9)]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(
    // public layoutService: LayoutService,
              private fb:FormBuilder,
              private ds: DatastorageserviceService,
              private router :Router,
              private messageService: MessageService
              ) { }

  ngOnInit(){
    this.signupForm = this.fb.group({
      email:this.emailControl,
      companyName:['' ,Validators.required],
      kraPin:['', Validators.required, Validators.minLength(11), Validators.maxLength(11)],
      address:[''],
      location:[''],
      mobile:this.mobileControl,
      password:this.passwordControl,
      confirmPassword:['', Validators.required],
      dealerLicense:false,

    });
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.signupForm.invalid){
      return;
    }
    const company ={
      email:this.companyForm['email'].value,
      companyName:this.companyForm['companyName'].value,
      kraPin:this.companyForm['kraPin'].value,
      mobile:this.companyForm['mobile'].value,
      address:this.companyForm['address'].value,
      location:this.companyForm['location'].value,
      password:this.companyForm['password'].value,
      confirmPassword:this.companyForm['confirmPassword'].value,
      // dealerLicense:this.companyForm['dealerLicense'].value,
    }
    this.signUp(company)
  }

  signUp(company:any){
    this.ds.createCompanyVendor(company).subscribe(
        response => {
          console.log('Vendor created successfully!', response);
          // Handle success response here
          this.messageService.add({
            severity:'success',
            summary:'Success',
            detail:'Vendor created successfully'
          })
          timer(2500).toPromise().then(()=>{
            this.router.navigate(['/'])
          })
        },

        error => {
          console.error('Failed to create vendor:', error);
          // Handle error response here
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Failed to create vendor'
          })
        }
      );

  }

  get companyForm(){
    return this.signupForm.controls;
  }

}
