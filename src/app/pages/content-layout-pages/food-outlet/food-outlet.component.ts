import { Component, OnInit } from "@angular/core";
import { UserService } from 'app/services/user/user.service';
import { FirebaseApiService } from 'app/services/firebase-api/firebase-api.service';
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';

@Component({
    selector: 'app-food-outlet',
    templateUrl: './food-outlet.component.html',
    styleUrls: ['./food-outlet.component.scss']
})
export class FoodOutletComponent implements OnInit {
    isLoading: boolean = true;
    constructor(
        public _userService: UserService,
        private _ngFireService: FirebaseApiService,
        public _navigationService: NavigationService
    ) { }

    async ngOnInit() {
        try {
            this._userService.foodOutletData = await this._ngFireService.getFoodOutletData('cAAFrBzaWqPMQ40qosPo1w8fKst1');
            this.isLoading = false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateFoodMenu() {
        this._navigationService.showLoader();
        try {
            await this._ngFireService.updateFoodOutletData('cAAFrBzaWqPMQ40qosPo1w8fKst1');
            this._navigationService.hideLoader();
        } catch (error) {
            console.log(error);
        }
    }
}