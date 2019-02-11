import { Injectable } from "@angular/core";
import { FirebaseUserDocument } from 'app/models/firebase-user-data';
import { FirebaseFoodOutletDocument } from 'app/models/firebase-food-outlet-data';

@Injectable()
export class UserService {
    isSignedIn: boolean = false;
    currentAccountType: string = '';
    
    userData: FirebaseUserDocument = new FirebaseUserDocument();
    foodOutletData: FirebaseFoodOutletDocument = new FirebaseFoodOutletDocument();
}