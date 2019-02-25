import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { HomePageComponent } from "./home/home.component";
import { SharedModule } from 'app/shared/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { FoodOutletComponent } from './food-outlet/food-outlet.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DataLogComponent } from './data-log/data-log.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        HomePageComponent,
        AboutUsComponent,
        FoodOutletComponent,
        SignUpComponent,
        OrderListComponent
    ]
})
export class ContentPagesModule { }
