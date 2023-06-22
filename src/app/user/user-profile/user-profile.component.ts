import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { timer } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  showMore: boolean = false;
  showOnSaleVehicles : boolean = false;
  showSoldVehicles: boolean = false;
  clicked = false;
  vehicles:any;
  imageSelected: boolean = false;
  selectedImage: any;
  updateForm!:FormGroup;
  isSubmitted = false;
  currentUserId!:string;
  user:any

  constructor(private messageService:MessageService,
              private ds:DataStorageService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRouter: ActivatedRoute,

    ) { }

    async ngOnInit(){
    this.activatedRouter.params.subscribe(params => {
      if(params['UserId']){
        this.currentUserId = params['UserId'];
        console.log("ID:",this.currentUserId)
        this.ds.getUser(this.currentUserId).subscribe(user => {
          this.user = user;
          console.log("DATA", user)
          console.log(user)

          // this.images = vehicle.images
        });
      }
    });
    this.getauthUser()
    this.updateForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      phoneNumber:['', Validators.required],

  });
  }


  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  toggleShowSoldVehicles(){
    this.showSoldVehicles =! this.showSoldVehicles;
  }

  toggleShowOnSaleVehicles(){
    this.showOnSaleVehicles = !this.showOnSaleVehicles;
  }

  onUpload(event: UploadEvent) {
    this.clicked=true
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  }
  checked(){
    console.log(55655667745, this.vehicles);

  }

  onFileSelected(event: any) {
    // const file = event.target.files[0];

    // Perform further processing with the file, e.g., upload to a server
    // console.log('Selected file:', file);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.imageSelected = true;
      };

      reader.readAsDataURL(file);
    }
  }

  getauthUser(){
    console.log("gothere")
    const userid = "1"
    this.ds.getUser(userid).subscribe(user => {
      this.user = user;
      console.log(user)
      console.log(user.firstName)

    })

  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.updateForm.invalid){
      return;
    }
    console.log(this.userUpdateForm['email'].value)
    const user={
        // this.imageSelected
        firstName:this.userUpdateForm['firstName'].value,
        lastName:this.userUpdateForm['lastName'].value,
        email:this.userUpdateForm['email'].value,
        phoneNumber:this.userUpdateForm['phoneNumber'].value,
    }
    this.update(user)
  }
  update(user:any){
    console.log('User updated successfully!');

    this.isSubmitted = true;
    this.ds.updateProfile(user).subscribe(
        response => {
          console.log('User updated successfully!', response);
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
  get userUpdateForm(){
    return this.updateForm.controls;
  }

}
