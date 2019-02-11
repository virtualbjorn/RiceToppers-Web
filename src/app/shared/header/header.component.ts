import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';
import { FirebaseAPIService } from 'app/services/firebase-api/firebase-api.service';
import { FirebaseAuthResponse } from 'app/models/firebase-auth-response';
import { UserService } from 'app/services/user/user.service';
import { AccountType } from 'app/models/user-data';
import { UIHelperService } from 'app/services/ui-helper/ui-helper.service';

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
        public _uiHelper: UIHelperService
    ) { }

    ngOnInit(): void {
        this._user.currentAccountType = this.selectedAccountType.accountTypeID;
    }

    showDropdown() {
        $('#dropdown').toggleClass('dropdown');
        $('.profile-pic-container').toggleClass('dropdown');
        $('.angle-down').toggleClass('active');
    }

    onSignOut() {
        this._navigation.navigateToHome();
        this._user.isSignedIn = false;
    }

    async onLogin() {
        this._uiHelper.showLoader();
        let response: FirebaseAuthResponse = await this._ngFire.authenticateUser(this.email, this.password);
        this._user.userData = await this._ngFire.getUserData(response.user.uid, this.selectedAccountType.accountTypeID);
        this._user.isSignedIn = true;
        this._uiHelper.hideLoader();
        // this._navigation.navigateToHome();
        this.email = null;
        this.password = null;
    }

    setCurrentAccountType() {
        this._user.currentAccountType = this.selectedAccountType.accountTypeID;
    }
}