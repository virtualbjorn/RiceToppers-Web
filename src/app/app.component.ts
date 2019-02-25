import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    // Set toastr container ref configuration for toastr positioning on screen
    constructor(
        private _user: UserService
    ) {}

    ngOnInit() {
        this._user.userData = JSON.parse(localStorage.getItem('user'));
        console.log(this._user.userData);
    }
}