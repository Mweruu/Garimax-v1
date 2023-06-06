import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

@NgModule({
    declarations: [
        AppTopBarComponent,
        AppFooterComponent,
        AppSidebarComponent,
        AppLayoutComponent,
        FiltersComponent,
        VehiclesComponent
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
        StepsModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
