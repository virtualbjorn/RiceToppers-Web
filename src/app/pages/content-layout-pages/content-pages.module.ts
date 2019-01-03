import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ContentLayoutPageComponent } from './content-layout-page/content-layout-page.component';
import { LoginPageComponent } from './login/login.component';
import { ResetPasswordPageComponent } from './reset-password/reset-password.component';
import { HomePageComponent } from "./home/home.component";

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
        ContentLayoutPageComponent,
        LoginPageComponent,
        ResetPasswordPageComponent,
        HomePageComponent
    ]
})
export class ContentPagesModule { }
