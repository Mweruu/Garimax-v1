import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { DatastorageserviceService } from 'src/app/datastorage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-individualsignup',
  templateUrl: './individualsignup.component.html',
  styleUrls: ['./individualsignup.component.scss']
})
export class IndividualsignupComponent implements OnInit {
  valCheck: string[] = ['remember'];
  signin = false;
  isSubmitted = false;
  individual = { firstName:'',lastName:'',email:'',mobile:'',gender:'',passportNo:'',password:'',confirmPassword:''}
  password!: string;
  mobileControl = new FormControl('', [Validators.required, Validators.minLength(9)]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  signupForm!: FormGroup;


  constructor(public layoutService: LayoutService,
              private fb:FormBuilder,
              private ds: DatastorageserviceService,
              private router :Router,
              private messageService: MessageService
              ){}


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:this.emailControl,
      mobile:this.mobileControl,
      gender: ['',Validators.required],
      passportNo:['', Validators.required],
      password:this.passwordControl,
      confirmPassword:[this.password, Validators.required]
    });
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.signupForm.invalid){
      return;
    }
    const individual:any = {
      firstName: this.individualForm['firstName'].value,
      lastName:this.individualForm['lastName'].value,
      email:this.individualForm['email'].value,
      mobile:this.individualForm['mobile'].value,
      gender:this.individualForm['gender'].value,
      passportNo:this.individualForm['passportNo'].value,
      password:this.individualForm['password'].value,
      confirmPassword:this.individualForm['confirmPassword'].value,
    }

    this.signUp(individual)
  }


  signUp(individual:any){
    this.ds.createIndividualVendor(individual).subscribe(
        response => {
          console.log('Vendor created successfully!', response);
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

  get individualForm(){
    return this.signupForm.controls;
  }
}
