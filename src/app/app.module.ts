import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { SocialLoginComponent } from './user/social-login/social-login.component';
import { CompanysignupComponent } from './vendor/company/companysignup/companysignup.component';
import { IndividualsignupComponent } from './vendor/individual/individualsignup/individualsignup.component';
import { SignupTabsComponent } from './vendor/signuptabs/signuptabs.component';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FiltersComponent } from './homepage/filters/filters.component';
import { BasicinfoComponent } from './homepage/vehicles/uploadcar/basicinfo/basicinfo.component';
import { CardetailsComponent } from './homepage/vehicles/uploadcar/cardetails/cardetails.component';
import { PreviewComponent } from './homepage/vehicles/uploadcar/preview/preview.component';
import { UploadcarComponent } from './homepage/vehicles/uploadcar/uploadcar.component';
import { UploadpictureComponent } from './homepage/vehicles/uploadcar/uploadpicture/uploadpicture.component';
import { VehiclesComponent } from './homepage/vehicles/vehicles.component';
import { ViewComponent } from './homepage/vehicles/view/view.component';
import { AppFooterComponent } from './layout/app.footer.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { SpecificuserVehiclesComponent } from './homepage/vehicles/specificuser-vehicles/specificuser-vehicles.component';
import { ViewvendorprofileComponent } from './homepage/vehicles/viewvendorprofile/viewvendorprofile.component';
import { UpdateprofileComponent } from './user/updateprofile/updateprofile.component';
import { ViewuservehiclesComponent } from './homepage/vehicles/viewuservehicles/viewuservehicles.component';
import { RangePipe } from './range.pipe';


import { NgxPaginationModule } from 'ngx-pagination';


import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { OverlayModule } from 'primeng/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipModule } from 'primeng/chip';
import { DataService } from './layout/data.service';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { ThumbnailsDirective } from './thumbnails.directive';
import { CarouselModule } from 'primeng/carousel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { WordlimitPipe } from './wordlimit.pipe';

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
    AppTopBarComponent,
    AppFooterComponent,
    AppLayoutComponent,
    FiltersComponent,
    VehiclesComponent,
    UploadcarComponent,
    BasicinfoComponent,
    UploadpictureComponent,
    CardetailsComponent,
    PreviewComponent,
    ViewComponent,
    SpecificuserVehiclesComponent,
    ViewvendorprofileComponent,
    UpdateprofileComponent,
    ViewuservehiclesComponent,
    ThumbnailsDirective,
    RangePipe,
    WordlimitPipe,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,
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
    GalleriaModule,
    SplitButtonModule,
    PaginatorModule,
    SelectButtonModule,
    InplaceModule,
    DialogModule,
    TagModule,
    BrowserModule,
    HttpClientModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    CalendarModule,
    PanelModule,
    CarouselModule,
    AutoCompleteModule,
    TableModule
  ],
  providers: [MessageService, AuthService,DataService, ViewComponent,RangePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
