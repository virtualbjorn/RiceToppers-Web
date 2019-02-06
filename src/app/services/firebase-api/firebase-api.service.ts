import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'q';
import { UserService } from '../user/user.service';

@Injectable()
export class FirebaseApiService {
    constructor(
        private ngFireStore: AngularFirestore,
        private ngAuth: AngularFireAuth,
        private _userService: UserService
    ) { }

    getFoodOutletMenu(foodOutletId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngFireStore.collection('food-outlet').doc(foodOutletId).valueChanges()
                .subscribe(
                    (response) => {
                        resolve(response);
                    },
                    (error) => {
                        reject(error)
                    });
        });
    }

    foodProviderAuth(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngAuth.auth.signInWithEmailAndPassword(username, password)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getFoodProviderData(foodProviderUID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngFireStore.collection('users').doc(foodProviderUID).valueChanges()
                .subscribe(
                    (response) => {
                        resolve(response);
                    },
                    (error) => {
                        reject(error)
                    });
        });
    }

    getFoodOutletData(foodProviderUID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngFireStore.collection('food-outlet').doc(foodProviderUID).valueChanges()
                .subscribe(
                    (response) => {
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    });
        });
    }

    updateFoodOutletData(foodProviderUID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngFireStore.collection('food-outlet').doc(foodProviderUID).update({
                foodMenu: this._userService.foodOutletData.foodMenu
            }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}