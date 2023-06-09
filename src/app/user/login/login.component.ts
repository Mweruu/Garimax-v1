import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/datastorage.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

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
               private ds: DataStorageService,
               private router: Router,
               private messageService: MessageService) { }

  ngOnInit(){
    this.loginForm = this.fb.group(
      {
      email:this.emailControl,
      password:this.passwordControl,
    });
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    const user:any = {
        email:this.userForm['email'].value,
        password:this.userForm['password'].value,
    }
    this.login(user);
  }

  login(user:any){
    this.signin = true;
    this.ds.userLogin(user).subscribe(
      response => {
        console.log('User authenticated', response);
        console.log(response.token)
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'User authenticated'
        })
        timer(2500).toPromise().then(()=>{
          this.router.navigate(['/'])

        })

        // Handle success response here
        if(response.message == "Wrong credentials, confirm password/email" ){
          console.log("Wrong credentials")
          // this.showAlert("Wrong credentials, confirm password/email")
          return;
        }
        else{
          // this.showAlert(" User Authenticated ")
          // this.router.navigate(['/']);
        }
      },
      error => {
        console.error('user not found:', error);
        console.log(error.error.error)
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'User with provided details does not exist'
        })
        // this.showAlert(error.error.error)
      }
    );
  }

  get userForm(){
    return this.loginForm.controls;
  }

}
