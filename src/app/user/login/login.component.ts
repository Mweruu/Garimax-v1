import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatastorageserviceService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  valCheck: string[] = ['remember'];
  signin = false;
  isSubmitted = false;
  loginForm!: FormGroup;
  user = {email:'', password:''};
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);


  password!: string;

  constructor(public layoutService: LayoutService,
              private fb:FormBuilder,
               private ds: DatastorageserviceService,
               private router: Router,) { }

  ngOnInit()
  {
    this.loginForm = this.fb.group(
      {
      email:this.emailControl,
      password:this.passwordControl,
    });
  }

  login(email: string, password: string){
    this.signin = true;
    this.isSubmitted = true;
    this.ds.userLogin({ email, password }).subscribe(
      response => {
        console.log('User authenticated', response);
        console.log(response.message)
        // Handle success response here
        if(response.message == "Wrong credentials, confirm password/email" ){
          console.log("Wrong credentials")
          // this.showAlert("Wrong credentials, confirm password/email")
          return;
        }
        else{
          // this.showAlert(" User Authenticated ")
          this.router.navigate(['/']);}
      },
      error => {
        console.error('user not found:', error);
        console.log(error.error.error)
        // this.showAlert(error.error.error)
      }
    );
    if(this.loginForm.invalid){
      return;
    }else{
    const user={
      email:this.loginForm.get('email')!.value,
      password:this.loginForm.get('password')!.value,
    }
  }
  }

}
