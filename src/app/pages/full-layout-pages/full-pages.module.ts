import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        NgbModule
    ],
    declarations: [       
        MainDashboardComponent
    ]
})
export class FullPagesModule { }
