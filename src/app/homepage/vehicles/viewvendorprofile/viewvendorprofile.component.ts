import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth.service';
import { DataStorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-viewvendorprofile',
  templateUrl: './viewvendorprofile.component.html',
  styleUrls: ['./viewvendorprofile.component.scss']
})
export class ViewvendorprofileComponent implements OnInit {
  showMore: boolean = false;
  showOnSaleVehicles : boolean = false;
  showSoldVehicles: boolean = false;
  clicked = false;
  vehicles:any;
  imageSelected: boolean = false;
  selectedImage: any;
  updateForm!:FormGroup;
  rateForm!:FormGroup;
  isSubmitted = false;
  currentUserId!:string;
  user:any;
  currentVehicleId!:string;
  vehicle:any;
  userId :any;
  userData:any;
  image:string[] =[];
  visible: boolean = false;
  contactVisible = false;
  chatVisible =false;
  email:any;
  firstName:any;
  phoneNumber:any;


  constructor(private ds:DataStorageService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService:AuthService
  ) { }

  async ngOnInit(){
    const userData=this.authService.getUserCredentials();
    this.email=userData.email
    this.firstName=userData.name
    this.phoneNumber=userData.phoneNumber

    this.activatedRoute.params.subscribe(params => {
      if(params['userId']){
        this.currentUserId = params['userId'];
        console.log("ID:",this.currentUserId)
        this.ds.getUser(this.currentUserId).subscribe(user => {
          this.user = user;
          console.log("DATA", user)
          // this.userUpdateForm['value'].setValue(user.firstName)
          // this.userUpdateForm['lastName'].setValue(user.lastName)
          // this.userUpdateForm['phoneNumber'].setValue(user.phoneNumber)
          // this.userUpdateForm['email'].setValue(user.email)
          // this.userUpdateForm['companyUrl'].setValue(user.firstName)
          // this.userUpdateForm['profileImage'].setValue(user.firstName)
        });

        this.ds.getUserVehicle(this.currentUserId).subscribe(vehicles =>{
          this.vehicles = vehicles;
          console.log(2323,vehicles.length,vehicles)

        })
      }
    });


    this.updateForm = this.fb.group({
      value:['4', Validators.required],

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

  get userUpdateForm(){
    return this.updateForm.controls;
  }

  getVehicles(userId: any){
    this.router.navigateByUrl(`vehicles/${this.currentUserId}`);
    console.log('gothere')
  }

  showDialog() {
    this.visible = true;
  }
  showDialogs() {
    this.contactVisible = true;
  }
  showChatDialog() {
    this.chatVisible = true;
  }
}

