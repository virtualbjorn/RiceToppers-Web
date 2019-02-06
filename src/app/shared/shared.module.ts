import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
    exports: [
        CommonModule,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        LoaderComponent,
        ToggleFullscreenDirective,
        NgbModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        LoaderComponent,
        ToggleFullscreenDirective
    ]
})
export class SharedModule { }
