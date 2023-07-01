import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CompanysignupComponent } from './vendor/company/companysignup/companysignup.component';
import { IndividualsignupComponent } from './vendor/individual/individualsignup/individualsignup.component';
import { SignupTabsComponent } from './vendor/signuptabs/signuptabs.component';
import { SocialLoginComponent } from './user/social-login/social-login.component';
import { UploadcarComponent } from './homepage/vehicles/uploadcar/uploadcar.component';
import { BasicinfoComponent } from './homepage/vehicles/uploadcar/basicinfo/basicinfo.component';
import { UploadpictureComponent } from './homepage/vehicles/uploadcar/uploadpicture/uploadpicture.component';
import { CardetailsComponent } from './homepage/vehicles/uploadcar/cardetails/cardetails.component';
import { PreviewComponent } from './homepage/vehicles/uploadcar/preview/preview.component';
import { ViewComponent } from './homepage/vehicles/view/view.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { ViewvendorprofileComponent } from './homepage/vehicles/viewvendorprofile/viewvendorprofile.component';
import { SpecificuserVehiclesComponent } from './homepage/vehicles/specificuser-vehicles/specificuser-vehicles.component';

const routes: Routes = [
  {
    path: '', component:AppLayoutComponent,
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
    path: 'vendorprofile/:userId', component:ViewvendorprofileComponent,
  },
  {
    path: 'vehicles/:userId', component:SpecificuserVehiclesComponent},
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
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
