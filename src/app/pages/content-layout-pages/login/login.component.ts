import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationService } from '../../../services/utilities/navigation/navigation.service';
import { SweetAlertService } from '../../../services/utilities/sweet-alert/sweet-alert.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;

    isLoggingIn = false;

    constructor(
        private _sweetAlertService: SweetAlertService,
        private _navigationService: NavigationService) {
    }

    async onSubmit() {
        // Do something here on form submit

        this.isLoggingIn = true;
        await this.delay(2000);
        this.isLoggingIn = false;

        this._sweetAlertService.alertSuccess("This is Sweet Alert");
    }

    onResetPassword() {
        this._navigationService.navigateToResetPasswordPage();
    }

    // Just a utility for ui showcasing
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}