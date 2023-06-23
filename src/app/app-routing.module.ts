import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { VehiclesComponent } from './homepage/vehicles/vehicles.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CompanysignupComponent } from './vendor/company/companysignup/companysignup.component';
import { IndividualsignupComponent } from './vendor/individual/individualsignup/individualsignup.component';
import { SignupTabsComponent } from './vendor/signuptabs/signuptabs.component';
import { SocialLoginComponent } from './user/social-login/social-login.component';
import { FiltersComponent } from './homepage/filters/filters.component';
import { UploadcarComponent } from './homepage/vehicles/uploadcar/uploadcar.component';
import { BasicinfoComponent } from './homepage/vehicles/uploadcar/basicinfo/basicinfo.component';
import { UploadpictureComponent } from './homepage/vehicles/uploadcar/uploadpicture/uploadpicture.component';
import { CardetailsComponent } from './homepage/vehicles/uploadcar/cardetails/cardetails.component';
import { PreviewComponent } from './homepage/vehicles/uploadcar/preview/preview.component';
import { ViewComponent } from './homepage/vehicles/view/view.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ViewvendorprofileComponent } from './homepage/vehicles/viewvendorprofile/viewvendorprofile.component';
import { UpdateprofileComponent } from './user/updateprofile/updateprofile.component';

const routes: Routes = [
  {
    path: '', component:AppLayoutComponent,
    children: [
      // {path: '', component:FiltersComponent},
      // {path: '', component:VehiclesComponent}
  ]
  },
  {
    path: 'sociallogin', component:SocialLoginComponent
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'signup', component:SignupComponent
  },
  {
    path: 'profile/:userId', component:UserProfileComponent,
  },
  // {
  //   path: 'updateprofile/:userId', component:UpdateprofileComponent
  // },
  {
    path: 'vendorprofile/:userId', component:ViewvendorprofileComponent
  },
  {
    path: 'vendorsignup', component:SignupTabsComponent,
    children: [
      {path: '', component:CompanysignupComponent,},
      {path: '', component:IndividualsignupComponent,}
    ]
  },
  {
    path: '', component:UploadcarComponent,
    children :[
      {path: 'basicinfo', component:BasicinfoComponent},
      {path: 'uploadpicture', component:UploadpictureComponent},
      {path: 'cardetails', component:CardetailsComponent},
      {path: 'preview', component:PreviewComponent}

    ]
  },
  {
    path: 'view/:vehicleId', component:ViewComponent,
    // children:[{},{},{}, {},{},{},{},{},]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
