import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { timer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';

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
  uploadedFile: any;
  imageForm!:FormGroup;
  file: any
  userData:any;
  image:string[] =[];


  constructor(private messageService:MessageService,
              private ds:DataStorageService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private dataService: DataService

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
        profileImage:[''],
        // password: ['']
    });

    this.userData = {
      "profileImage": this.dataService.getuploadPictureData(),
    }

    if(this.userData.profileImage){
      this.processImageFiles(this.userData.profileImage)
      console.log(this.image);
    }
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

  getVehiclebyId(){
    this.ds.getUserVehicle(this.currentUserId).subscribe(vehicles =>{
      console.log(vehicles)
    })
  }

  get userUpdateForm(){
    return this.updateForm.controls;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('Selected file:', file.name);

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.imageSelected = true;
        this.onUpload(file)

      };

      reader.readAsDataURL(file);
    }
  }

  onUpload(file: any) {
    try{
      if (!this.uploadedFile) {
        this.uploadedFile = []; // Initialize uploadedFiles as an empty array
      }
      this.uploadedFile.push(file);
      this.imageUploaded = true;
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: `Image(s) uploaded`});
    } catch(err){
      console.log(err)
      this.messageService.add({severity: 'error', summary: 'Image(s) Upload Failed', detail: `Failed to upload Images`});
    }
  }


  processImageFiles(files: any[]): void {
    for (const file of files) {
      this.image.push(file.objectURL);
    }
  }

  onSubmit(userId: string){
    this.dataService.setuploadPictureData(this.uploadedFile);
    this.isSubmitted = true;
    if(this.updateForm.invalid){
      return;
    }
    console.log(this.userUpdateForm['companyUrl'].value)
    console.log(this.uploadedFile)
    // this.uploadedFile = this.userUpdateForm['profileImage'].value
    console.log(this.userUpdateForm['profileImage'].value)
    const images: File[] = this.dataService.getuploadPictureData();

    const user={
        // this.imageSelected
        firstName:this.userUpdateForm['firstName'].value,
        lastName:this.userUpdateForm['lastName'].value,
        email:this.userUpdateForm['email'].value,
        companyUrl:this.userUpdateForm['companyUrl'].value,
        phoneNumber:this.userUpdateForm['phoneNumber'].value,
        profileImage:(this.userUpdateForm['profileImage'].value,images),

        // password:this.userUpdateForm['password'].value || this.user.p
    }
    console.log("final user data",user)

    this.ds.updateProfile(userId, user).subscribe(
      response => {
        console.log('User details updated successfully!', response);
        // Handle success response here
        console.log(1123,response)
        this.user = response
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

    // this.updatedData= user
    // console.log("final user data",this.updatedData)
    // this.update(userId)
  }


  // update(userId: string){
  //   this.isSubmitted = true;
  //   this.ds.updateProfile(userId, this.updatedData).subscribe(
  //       response => {
  //         console.log('User details updated successfully!', response);
  //         // Handle success response here
  //         console.log(1123,response)
  //         this.user = response
  //         this.messageService.add({
  //           severity:'success',
  //           summary:'Success',
  //           detail:'User details updated successfully'
  //         })
  //       },
  //       error => {
  //         console.error('Failed to update user:', error);
  //         // Handle error response here
  //         this.messageService.add({
  //           severity:'error',
  //           summary:'Error',
  //           detail:'Failed to update user'
  //         })
  //       }
  //     );

  // }

}
