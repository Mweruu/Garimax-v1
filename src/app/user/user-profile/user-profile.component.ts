import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataStorageService } from 'src/app/datastorage.service';
import { timer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/layout/data.service';

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
  profileImage:any;


  constructor(private messageService:MessageService,
              private ds:DataStorageService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService

    ) { }

  async ngOnInit(){

    this.activatedRoute.params.subscribe(params => {
      if(params['userId']){
        this.currentUserId = params['userId'];
        console.log("ID:",this.currentUserId)
        this.ds.getUser(this.currentUserId).subscribe(user => {
          this.user = user;
          this.userId= user.id;
          this.profileImage = user.profileImage;
          console.log("DATA", this.user, "isVendor",user.isVendor)

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


  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('Selected file:', file.name);
      // const uploim=this.dataService.setuploadPictureData(file.name);
      this.profileImage = [];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.imageSelected = true;
        this.onUpload(file)
        console.log("profileimageDATA", this.user.profileImage)

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
    this.dataService.setuploadPictureData(this.uploadedFile);


    this.userData = {
      profileImage: file,
    }
      this.processImageFiles(this.userData.profileImage)
      console.log(3440000034,this.profileImage);

  }

  processImageFiles(file: any): void {
    const imageUrl = URL.createObjectURL(file);
    this.profileImage.push(imageUrl);
    }

  onSubmit(userId: string){
    const image = this.dataService.getuploadPictureData();
    console.log("got here", image)

    this.isSubmitted = true;
    if(this.updateForm.invalid){
      return;
    }
    console.log(4554444,this.uploadedFile)
    const formData = new FormData();
    formData.append('profileImage',image[0]);
    // const cc = formData.append('profileImage',this.uploadedFile)


    const user={
        // this.imageSelected
        firstName:this.userUpdateForm['firstName'].value,
        lastName:this.userUpdateForm['lastName'].value,
        email:this.userUpdateForm['email'].value,
        companyUrl:this.userUpdateForm['companyUrl'].value,
        phoneNumber:this.userUpdateForm['phoneNumber'].value,

        // password:this.userUpdateForm['password'].value || this.user.p
    }
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('companyUrl', user.companyUrl);
    formData.append('phoneNumber', user.phoneNumber);

    console.log("final user data",user)

    this.ds.updateProfile(userId, formData).subscribe(
      response => {
        console.log('User details updated successfully!', response);
        // Handle success response here
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
  }

  getVehicle(id: string){
    this.router.navigateByUrl(`uploadcar/basicinfo/${id}`);
  }

  get userUpdateForm(){
    return this.updateForm.controls;
  }
}
