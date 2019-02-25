import { Component, OnInit } from "@angular/core";
import { UserService } from 'app/services/user/user.service';
import { FirebaseAPIService } from 'app/services/firebase-api/firebase-api.service';
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';
import { UIHelperService } from 'app/services/ui-helper/ui-helper.service';

@Component({
    selector: 'app-food-outlet',
    templateUrl: './food-outlet.component.html',
    styleUrls: ['./food-outlet.component.scss']
})
export class FoodOutletComponent implements OnInit {
    isLoading: boolean = true;
    constructor(
        public _user: UserService,
        private _ngFire: FirebaseAPIService,
        public _navigation: NavigationService,
        public _uiHelper: UIHelperService
    ) { }

    async ngOnInit() {
        if(this._user.currentAccountType != 'food-provider') {
            this._navigation.navigateToHome();
        }
        try {
            this._user.foodOutletData = await this._ngFire.getFoodOutletData('c7XF1A8j1JX0mVemGBS7f7aKHcx1');
            console.log(this._user.foodOutletData);
            this.isLoading = false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateFoodMenu() {
        this._uiHelper.showLoader();
        try {
            await this._ngFire.updateFoodOutletData('c7XF1A8j1JX0mVemGBS7f7aKHcx1');
            this._uiHelper.hideLoader();
        } catch (error) {
            console.log(error);
        }
    }
}