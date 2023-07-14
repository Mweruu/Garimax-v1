import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { DataStorageService } from 'src/app/datastorage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { PasswordValidator } from 'src/app/password-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  valCheck: string[] = ['remember'];
  isSubmitted = false;
  user = {firstName:'', lastName:'',email:'',phoneNumber:'', password:'',confirmPassword:''};
  signin = false;
  signupForm :FormGroup = new FormGroup({});
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneNumberControl = new FormControl('', [Validators.required, Validators.minLength(9)]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password!: string;

  constructor(public layoutService: LayoutService,
    private ds: DataStorageService,
    private fb: FormBuilder,
    private router: Router,
    private messageService:MessageService
    ) { }

    // function PasswordValidator(passwordKey: string, confirmPasswordKey: string) {
    //   return (formGroup: FormGroup) => {
    //     const passwordControl = formGroup.controls[passwordKey];
    //     const confirmPasswordControl = formGroup.controls[confirmPasswordKey];

    //     if (passwordControl.value !== confirmPasswordControl.value) {
    //       confirmPasswordControl.setErrors({ passwordMismatch: true });
    //     } else {
    //       confirmPasswordControl.setErrors(null);
    //     }
    //   };
    // }
  ngOnInit() {
    this.signupForm = this.fb.group({
        firstName:['', Validators.required],
        lastName:['', Validators.required],
        email:this.emailControl,
        phoneNumber:this.phoneNumberControl,
        password:this.passwordControl,
        confirmPassword:['', Validators.required, ]
    },
    {
      validator:PasswordValidator('password', 'confirmPassword')
    });
  }


  MustMatch(controlName:string, matchingControlName:string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors['MustMatch']){
        return;
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true})
      }
      else{
        matchingControl.setErrors(null);

      }
  }
}

  onSubmit(){
    this.isSubmitted = true;
    if(this.signupForm.invalid){
      return;
    }
    const user={
        firstName:this.userSignupForm['firstName'].value,
        lastName:this.userSignupForm['lastName'].value,
        email:this.userSignupForm['email'].value,
        phoneNumber:this.userSignupForm['phoneNumber'].value,
        password:this.userSignupForm['password'].value,
        confirmPassword:this.userSignupForm['confirmPassword'].value
    }
    this.signUp(user)
  }

  signUp(user:any){
    // this.isSubmitted = true;
    this.ds.createUser(user).subscribe(
        response => {
          console.log('User created successfully!', response);
          // Handle success response here
          console.log(1123,response.token)
          this.messageService.add({
            severity:'success',
            summary:'Success',
            detail:'User created successfully, kindly login'
          })
          timer(2500).toPromise().then(()=>{
            this.router.navigate(['/login'])
          })
        },
        error => {
          console.error('Failed to create user:', error);
          // Handle error response here
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Failed to create user'
          })
        }
      );

  }

  // private _getUsers(){
  //   this.ds.getUser().subscribe(())=>{}
  // }

  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }

  get userSignupForm(){
    return this.signupForm.controls;
  }

}
