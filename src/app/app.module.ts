import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
// import { VehiclesComponent } from './vehicles/vehicles.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { LoginComponent } from './user/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './user/signup/signup.component';
import { SocialLoginComponent } from './user/social-login/social-login.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CompanysignupComponent } from './vendor/company/companysignup/companysignup.component';
import { CompanyloginComponent } from './vendor/company/companylogin/companylogin.component';
import { IndividualsignupComponent } from './vendor/individual/individualsignup/individualsignup.component';
import { IndividualloginComponent } from './vendor/individual/individuallogin/individuallogin.component';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';
import { LogintabsComponent } from './vendor/logintabs/logintabs.component';
import { SignupTabsComponent } from './vendor/signuptabs/signuptabs.component';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { OverlayModule } from 'primeng/overlay';
// import { FiltersComponent } from './filters/filters.component';


@NgModule({
  declarations: [
    AppComponent,
    // VehiclesComponent,
    LoginComponent,
    SignupComponent,
    CompanysignupComponent,
    CompanyloginComponent,
    IndividualsignupComponent,
    IndividualloginComponent,
    LogintabsComponent,
    SignupTabsComponent,
    SocialLoginComponent,
    // FiltersComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    CardModule,
    DropdownModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    TabMenuModule,
    TabViewModule,
    SplitterModule,
    ImageModule,
    DividerModule,
    DataViewModule,
    RatingModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
