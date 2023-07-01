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
import { OverlayModule } from 'primeng/overlay';
import { RatingModule } from 'primeng/rating';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { DataService } from './data.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ViewComponent } from '../homepage/vehicles/view/view.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChipModule } from 'primeng/chip';
import { AuthService } from '../auth.service';
import { GalleriaModule } from 'primeng/galleria';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PaginatorModule } from 'primeng/paginator';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InplaceModule } from 'primeng/inplace';

@NgModule({
    declarations: [
     
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
        GalleriaModule,
        SplitButtonModule,
        PaginatorModule,
        SelectButtonModule,
        InplaceModule,
    ],
    providers:[DataService, AuthService, MessageService, ViewComponent],
    // exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
