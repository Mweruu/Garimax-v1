import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
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
import { IndividualsignupComponent } from './vendor/individual/individualsignup/individualsignup.component';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';
import { SignupTabsComponent } from './vendor/signuptabs/signuptabs.component';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { OverlayModule } from 'primeng/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipModule } from 'primeng/chip';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CompanysignupComponent,
    IndividualsignupComponent,
    SignupTabsComponent,
    SocialLoginComponent,
    UserProfileComponent,
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
    OverlayModule,
    ReactiveFormsModule,
    ToastModule,
    FieldsetModule,
    StepsModule,
    FileUploadModule,
    ChipModule,
  ],
  providers: [MessageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
