import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { OverlayModule } from 'primeng/overlay';
import { FiltersComponent} from '../homepage/filters/filters.component'
import { VehiclesComponent } from '../homepage/vehicles/vehicles.component';
import { RatingModule } from 'primeng/rating';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { StepsModule } from 'primeng/steps';
import { BasicinfoComponent } from '../homepage/vehicles/uploadcar/basicinfo/basicinfo.component';
import { CardetailsComponent } from '../homepage/vehicles/uploadcar/cardetails/cardetails.component';
import { UploadcarComponent } from '../homepage/vehicles/uploadcar/uploadcar.component';
import { UploadpictureComponent } from '../homepage/vehicles/uploadcar/uploadpicture/uploadpicture.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { PreviewComponent } from '../homepage/vehicles/uploadcar/preview/preview.component';
import { DataService } from './data.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ViewComponent } from '../homepage/vehicles/view/view.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { VehiclesPipe } from '../homepage/vehicles/vehicles.pipe';
import { ChipModule } from 'primeng/chip';
import { AuthService } from '../auth.service';


@NgModule({
    declarations: [
        AppTopBarComponent,
        AppFooterComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        FiltersComponent,
        VehiclesComponent,
        UploadcarComponent,
        BasicinfoComponent,
        UploadpictureComponent,
        CardetailsComponent,
        PreviewComponent,
        ViewComponent,
        VehiclesPipe

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        OverlayModule,
        RatingModule,
        SplitterModule,
        CardModule,
        DividerModule,
        DropdownModule,
        ButtonModule,
        ImageModule,
        FieldsetModule,
        StepsModule,
        ToastModule,
        FileUploadModule,
        CheckboxModule,
        TagModule,
        CalendarModule,
        ReactiveFormsModule,
        DialogModule,
        TabMenuModule,
        ChipModule,
    ],
    providers:[DataService, AuthService, MessageService,VehiclesComponent],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
