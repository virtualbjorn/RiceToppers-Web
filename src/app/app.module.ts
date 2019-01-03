import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { environment } from '../environments/environment';

import * as $ from 'jquery';
import { HttpModule } from '@angular/http';
import { SweetAlertService } from './services/utilities/sweet-alert/sweet-alert.service';
import { NavigationService } from './services/utilities/navigation/navigation.service';
import { CoreModule } from './core/core.module';
import { RouteReuseStrategy } from '@angular/router';
import { CoreRouteReuseStrategy } from './core/route-strategy/core-route-reuse-strategy';

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        SharedModule,
        HttpModule,
        CoreModule,
        NgbModule.forRoot()
    ],
    exports: [],
    providers: [
        SweetAlertService, 
        NavigationService, 
        {provide: RouteReuseStrategy, useClass: CoreRouteReuseStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }