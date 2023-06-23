import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { timer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  user:any;
  updatedData :any;
  userId:any;
  imageUploaded = false;
  uploadedFiles: any[] = [];
  imageForm!:FormGroup;
  file: any

  constructor(private messageService:MessageService,
              private ds:DataStorageService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRouter: ActivatedRoute,

    ) { }

    async ngOnInit(){
    this.activatedRouter.params.subscribe(params => {
      if(params['userId']){
        this.currentUserId = params['userId'];
        console.log("ID:",this.currentUserId)
        this.ds.getUser(this.currentUserId).subscribe(user => {
          this.user = user;
          this.userId= user.id
          console.log("DATA", this.userId)
          this.userUpdateForm['firstName'].setValue(user.firstName)
          this.userUpdateForm['lastName'].setValue(user.lastName)
          this.userUpdateForm['phoneNumber'].setValue(user.phoneNumber)
          this.userUpdateForm['email'].setValue(user.email)
          this.userUpdateForm['companyUrl'].setValue(user.companyUrl)
          this.userUpdateForm['profileImage'].setValue(user.profileImage)
          // this.userUpdateForm['password'].setValue(user.password)

        });
        this.ds.getUserVehicle(this.currentUserId).subscribe(vehicles =>{
          this.vehicles = vehicles;
          console.log(2323,vehicles)
        })

      }
    });
    this.updateForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      phoneNumber:['', Validators.required],
      companyUrl:[''],
      profileImage:new FormControl(),
      // password: ['']
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

  // onUpload(event: UploadEvent) {
  //   this.clicked=true
  //   this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
  // }
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



  // updateUser(userId: string){
  //   console.log('gothere',this.user)
  //   this.router.navigateByUrl(`profile/${userId}/updateprofile/${userId}`);
  // }


  getVehiclebyId(){
    this.ds.getUserVehicle(this.currentUserId).subscribe(vehicles =>{
      console.log(vehicles)
    })
  }

  get userUpdateForm(){
    return this.updateForm.controls;
  }

  onSubmit(userId: string){
    this.isSubmitted = true;
    if(this.updateForm.invalid){
      return;
    }
    console.log(this.userUpdateForm['companyUrl'].value)
    const user={
        // this.imageSelected
        firstName:this.userUpdateForm['firstName'].value,
        lastName:this.userUpdateForm['lastName'].value,
        email:this.userUpdateForm['email'].value,
        companyUrl:this.userUpdateForm['companyUrl'].value,
        phoneNumber:this.userUpdateForm['phoneNumber'].value,
        profileImage:this.userUpdateForm['profileImage'].value,
        // password:this.userUpdateForm['password'].value || this.user.p,

    }
    this.updatedData= user
    console.log(this.updatedData)
    this.update(userId)
  }


  update(userId: string){
    this.isSubmitted = true;
    this.ds.updateProfile(userId, this.updatedData).subscribe(
        response => {
          console.log('User details updated successfully!', response);
          // Handle success response here
          console.log(1123,response)
          this.messageService.add({
            severity:'success',
            summary:'Success',
            detail:'User details updated successfully'
          })
        },
        error => {
          console.error('Failed to update user:', error);
          // Handle error response here
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Failed to update user'
          })
        }
      );

  }

  onUpload(event: any) {
    try{
      let count = 0;
      for(let file of event.files) {
        count = count + 1
        this.uploadedFiles.push(file);
      }
      this.file = event.files[0];
      this.imageUploaded = true;
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: `${count} Image(s) uploaded`});
    } catch(err){
      console.log(err)
      this.messageService.add({severity: 'dagger', summary: 'Image(s) Upload Failed', detail: `Failed to upload Images`});
    }
  }
}
