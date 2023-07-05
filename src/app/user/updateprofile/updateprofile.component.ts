import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { DataStorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent implements OnInit {
  updateForm!:FormGroup;
  isSubmitted = false;

  constructor( private messageService:MessageService,
    private ds:DataStorageService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      phoneNumber:['', Validators.required],
      companyUrl:['']
  });
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.updateForm.invalid){
      return;
    }
    console.log(this.userUpdateForm['url'].value)
    const user={
        // this.imageSelected
        firstName:this.userUpdateForm['firstName'].value,
        lastName:this.userUpdateForm['lastName'].value,
        email:this.userUpdateForm['email'].value,
        companyUrl:this.userUpdateForm['companyUrl'].value,
        phoneNumber:this.userUpdateForm['phoneNumber'].value,
    }

    this.update(user)
  }

  update(user:any){
  //   this.isSubmitted = true;
  //   this.ds.updateProfile(user).subscribe(
  //       response => {
  //         console.log('User updated successfully!', response);
  //         // Handle success response here
  //         console.log(1123,response.token)
  //         this.messageService.add({
  //           severity:'success',
  //           summary:'Success',
  //           detail:'User created successfully, kindly login'
  //         })
  //         timer(2500).toPromise().then(()=>{
  //           this.router.navigate(['/login'])
  //         })
  //       },
  //       error => {
  //         console.error('Failed to create user:', error);
  //         // Handle error response here
  //         this.messageService.add({
  //           severity:'error',
  //           summary:'Error',
  //           detail:'Failed to create user'
  //         })
  //       }
  //     );

  }


  get userUpdateForm(){
    return this.updateForm.controls;
  }

}
