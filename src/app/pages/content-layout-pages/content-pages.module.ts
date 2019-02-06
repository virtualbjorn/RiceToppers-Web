import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { LoginPageComponent } from './login/login.component';
import { HomePageComponent } from "./home/home.component";
import { SharedModule } from 'app/shared/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { FoodOutletComponent } from './food-outlet/food-outlet.component';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        LoginPageComponent,
        HomePageComponent,
        AboutUsComponent,
        FoodOutletComponent
    ]
})
export class ContentPagesModule { }
