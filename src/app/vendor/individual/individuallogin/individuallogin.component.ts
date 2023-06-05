import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatastorageserviceService } from 'src/app/datastorage.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-individuallogin',
  templateUrl: './individuallogin.component.html',
  styleUrls: ['./individuallogin.component.scss']
})
export class IndividualloginComponent implements OnInit {
  loginForm!:FormGroup;
  valCheck: string[] = ['remember'];
  isSubmitted = false;
  individual = { email:'', password:'' };

  password!: string;
  constructor(public layoutService: LayoutService,
              private fb:FormBuilder,
              private ds: DatastorageserviceService,
              private router: Router,) { }

  ngOnInit(){
    this.loginForm = this.fb.group(
      {
      email:['', Validators.required],
      password:['', Validators.required]
    });
  }

  login(email: string, password: string){
    this.isSubmitted = true;

    if(this.loginForm.invalid){
      return;
    }

    const individual = {
      email:email,
      password:password,
    }

    this.ds.userLogin(individual).subscribe(
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
