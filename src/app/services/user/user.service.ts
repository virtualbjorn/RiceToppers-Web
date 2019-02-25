import { Injectable } from "@angular/core";
import { FirebaseUserDocument } from 'app/models/firebase-user-data';
import { FirebaseFoodOutletDocument } from 'app/models/firebase-food-outlet-data';
import { OrderList } from 'app/models/firebase-order-list';

@Injectable()
export class UserService {
    isSignedIn: boolean = false;
    currentAccountType: string = '';

    userData: FirebaseUserDocument = new FirebaseUserDocument();
    foodOutletData: FirebaseFoodOutletDocument = new FirebaseFoodOutletDocument();
    orderList: OrderList[] = [];

    reset() {
        this.userData = new FirebaseUserDocument();
        this.foodOutletData = new FirebaseFoodOutletDocument();
        localStorage.removeItem('user');
        this.isSignedIn = false;
        this.currentAccountType = '';
    }
}