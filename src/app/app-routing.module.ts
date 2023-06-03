import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CompanysignupComponent } from './vendor/company/companysignup/companysignup.component';
import { IndividualloginComponent } from './vendor/individual/individuallogin/individuallogin.component';
import { CompanyloginComponent } from './vendor/company/companylogin/companylogin.component';
import { IndividualsignupComponent } from './vendor/individual/individualsignup/individualsignup.component';
import { SignupTabsComponent } from './vendor/signuptabs/signuptabs.component';
import { LogintabsComponent } from './vendor/logintabs/logintabs.component';
import { SocialLoginComponent } from './user/social-login/social-login.component';

const routes: Routes = [
  {
    path: '', component:AppLayoutComponent,
    children: [
      {path: '', component:VehiclesComponent}
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
    path: 'vendorlogin', component:LogintabsComponent,
    children: [
      {path: 'companylogin', component:CompanyloginComponent,},
      {path: 'individuallogin', component:IndividualloginComponent,}
    ]
  },
  {
    path: 'vendorsignup', component:SignupTabsComponent,
    children: [
      {path: 'companysignup', component:CompanysignupComponent,},
      {path: 'individualsignup', component:IndividualsignupComponent,}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
