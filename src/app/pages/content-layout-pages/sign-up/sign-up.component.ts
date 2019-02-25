import { Component, OnInit } from '@angular/core';
import { FirebaseAPIService } from 'app/services/firebase-api/firebase-api.service';
import { UserService } from 'app/services/user/user.service';
import { UIHelperService } from 'app/services/ui-helper/ui-helper.service';
import { AccountType, SignUpData } from 'app/models/user-data';
import { FirebaseUserDocument } from 'app/models/firebase-user-data';
import { SweetAlertService } from 'app/services/utilities/sweet-alert/sweet-alert.service';
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    accountTypes: AccountType[] = [{ accountTypeName: 'Customer', accountTypeID: 'customer' }, { accountTypeName: 'Food Provider', accountTypeID: 'food-provider' }];
    selectedAccountType: AccountType = this.accountTypes[0];

    isPasswordMatched: boolean = false;
    isSuccessful: boolean = false;

    signUpUserData: SignUpData = new SignUpData();
    addressCount: number = 1;
    tempAddressArray: string[] = new Array<string>(this.addressCount);

    constructor(
        private _ngFire: FirebaseAPIService,
        public _user: UserService,
        public _uiHelper: UIHelperService,
        private _sweetAlert: SweetAlertService,
        public _navigation: NavigationService
    ) { }

    isValidated(): boolean {
        if (!this.signUpUserData.email) {
            document.querySelector('.email-address-container').scrollIntoView(true);
            return false;
        } else if (!this.signUpUserData.firstName) {
            document.querySelector('.name-container').scrollIntoView(true);
            return false;
        } else if (!this.signUpUserData.middleName) {
            document.querySelector('.name-container').scrollIntoView(true);
            return false;
        } else if (!this.signUpUserData.lastName) {
            document.querySelector('.name-container').scrollIntoView(true);
            return false;
        } else if (!this.signUpUserData.contactNo) {
            document.querySelector('.contact-number-container').scrollIntoView(true);
            return false;
        } else if (!this.signUpUserData.address) {
            document.querySelector('.address-container').scrollIntoView(true);
            return false;
        } else if (!this.signUpUserData.password && !this.signUpUserData.confirmPassword && this.signUpUserData.password != this.signUpUserData.confirmPassword) {
            document.querySelector('.passwords-container').scrollIntoView(true);
            return false;
        }
        return true;
    }

    ngOnInit(): void {
        this.signUpUserData.address = new Array<string>();
        this.signUpUserData.address[0] = '';
        this.setCurrentAccountType();
    }

    setCurrentAccountType() {
        this.signUpUserData.accountType = this.selectedAccountType.accountTypeID;
    }

    updateAddress(index: number) {
        let addressEl: any = document.querySelector(`#textarea-${index}`);
        this.signUpUserData.address[index] = addressEl.value;
    }

    onAddNewAddress() {
        this.signUpUserData.address[this.addressCount++] = '';
        this.tempAddressArray = new Array<string>(this.addressCount);
    }

    onRemoveAddress(index: number) {
        this.tempAddressArray.splice(index, 1);
        this.signUpUserData.address.splice(index, 1);
        --this.addressCount;
    }

    async onSignUp() {
        if (this.isValidated()) {
            try {
                let result = await this._ngFire.signUpUser(this.signUpUserData.email, this.signUpUserData.password);
                let userCredentials: FirebaseUserDocument = {
                    accountCreated: result.user.metadata.creationTime,
                    accountType: this.signUpUserData.accountType,
                    email: result.user.email,
                    firstName: this.signUpUserData.firstName,
                    middleName: this.signUpUserData.middleName,
                    lastName: this.signUpUserData.lastName,
                    contactNumber: this.signUpUserData.contactNo,
                    address: this.signUpUserData.address,
                    uid: result.user.uid,
                    imageUrl: ''
                }
                await this._ngFire.createUserData(userCredentials);
                await this._ngFire.sendEmailVerification();
                this._sweetAlert.alertSuccess('You have successfuly signed-up!');
                this._navigation.navigateToHome();
            } catch (error) {
                console.log(error);
            }
        }
    }
}
