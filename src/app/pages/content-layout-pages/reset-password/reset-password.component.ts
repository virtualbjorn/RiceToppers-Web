import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NavigationService } from '../../../services/utilities/navigation/navigation.service';
import { SweetAlertService } from '../../../services/utilities/sweet-alert/sweet-alert.service';
import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordPageComponent {

    @ViewChild('f') resetForm: NgForm;

    isResetting = false;

    constructor(
        private _sweetAlertService: SweetAlertService,
        private _navigationService: NavigationService) {
    }

    // On submit button click    
    async onSubmit() {
        this.isResetting = true;
        await this.delay(2000);
        this.isResetting = false;

        this._sweetAlertService.alertError("This is Sweet Alert");
    }

    onCancel() {
        this._navigationService.navigateToLogin();
    }

    // Just a utility for ui showcasing
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}