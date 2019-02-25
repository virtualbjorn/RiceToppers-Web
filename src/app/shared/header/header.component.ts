import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';
import { FirebaseAPIService } from 'app/services/firebase-api/firebase-api.service';
import { FirebaseAuthResponse } from 'app/models/firebase-auth-response';
import { UserService } from 'app/services/user/user.service';
import { AccountType } from 'app/models/user-data';
import { UIHelperService } from 'app/services/ui-helper/ui-helper.service';
import { SweetAlertService } from 'app/services/utilities/sweet-alert/sweet-alert.service';

@Component({
    // moduleId: module.id,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;
    isSignup: boolean = false;
    isSignInClick: boolean = false;

    email: string = '';
    password: string = '';

    accountTypes: AccountType[] = [{ accountTypeName: 'Customer', accountTypeID: 'customer' }, { accountTypeName: 'Food Provider', accountTypeID: 'food-provider' }];
    selectedAccountType: AccountType = this.accountTypes[0];

    constructor(
        public _navigation: NavigationService,
        private _ngFire: FirebaseAPIService,
        public _user: UserService,
        public _uiHelper: UIHelperService,
        private _sweetAlert: SweetAlertService
    ) { }

    ngOnInit(): void {
        this._user.currentAccountType = this.selectedAccountType.accountTypeID;
        if(this._user.userData.accountCreated) {
        this._user.currentAccountType = this._user.userData.accountType;
        this.isLoggedIn = true;
            this._user.isSignedIn = true;
        }
    }

    showDropdown() {
        $('#dropdown').toggleClass('dropdown');
        $('.profile-pic-container').toggleClass('dropdown');
        $('.angle-down').toggleClass('active');
    }
    hideDropdown() {
        $('#dropdown').removeClass('dropdown');
        $('.profile-pic-container').removeClass('dropdown');
        $('.angle-down').removeClass('active');
    }

    onSignOut() {
        this._navigation.navigateToHome();
        this._user.reset();
    }

    async onLogin() {
        this._uiHelper.showLoader();
        try {
            let response: FirebaseAuthResponse = await this._ngFire.authenticateUser(this.email, this.password);
            this._user.userData = await this._ngFire.getUserData(response.user.uid, this.selectedAccountType.accountTypeID);
            this._uiHelper.hideLoader();
            localStorage.setItem('user', JSON.stringify(this._user.userData));
            if (this._user.userData.accountType != undefined || this._user.userData.accountType == this.selectedAccountType.accountTypeID) {
                this._user.isSignedIn = true;
                if (this.selectedAccountType.accountTypeID == 'food-provider') {
                    this._navigation.navigateToFoodOutlet();
                } else {
                    this._navigation.navigateToHome();
                }
            }
        } catch (error) {
            this._user.isSignedIn = false;
            this._sweetAlert.alertError('Please make sure to enter your correct email and password!')
            this._uiHelper.hideLoader();
        }
        this.email = null;
        this.password = null;
    }

    setCurrentAccountType() {
        this._user.currentAccountType = this.selectedAccountType.accountTypeID;
    }
}