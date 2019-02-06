import { Component, HostBinding } from '@angular/core';
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';
import { FirebaseApiService } from 'app/services/firebase-api/firebase-api.service';
import { FirebaseAuthResponse } from 'app/models/firebase-auth-response';
import { UserService } from 'app/services/user/user.service';

@Component({
    // moduleId: module.id,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    isLoggedIn: boolean = false;
    isSignInClick: boolean = false;
    username: string = '';
    password: string = '';
    name: string = 'Test Outlet';

    constructor(
        public _navigationService: NavigationService,
        private _ngFireService: FirebaseApiService,
        private _userService: UserService
    ) { }

    showDropdown() {
        $('#dropdown').toggleClass('dropdown');
        $('.profile-pic-container').toggleClass('dropdown');
        $('.angle-down').toggleClass('active');
    }

    onSignOut() {
        this._navigationService.navigateToHome();
        this.isLoggedIn = false;
    }

    async onLogin() {
        this._navigationService.showLoader();
        let response: FirebaseAuthResponse = await this._ngFireService.foodProviderAuth(this.username, this.password);
        this._userService.userData = await this._ngFireService.getFoodProviderData(response.user.uid);
        this._navigationService.hideLoader();
        this._navigationService.navigateToFoodOutlet();
        // console.log(this._userService.userData);
        // this.name = this._userService.foodOutletData.foodProviderData.name;
        this.isLoggedIn = true;
    }
}