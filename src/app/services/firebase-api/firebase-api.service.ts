import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'q';
import { UserService } from '../user/user.service';
import { FirebaseUserDocument } from 'app/models/firebase-user-data';

@Injectable()
export class FirebaseAPIService {
    constructor(
        private ngFireStore: AngularFirestore,
        private ngAuth: AngularFireAuth,
        private _user: UserService
    ) { }

    signUpUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return new Promise((resolve, reject) => {
            this.ngAuth.auth.createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    createUserData(userData: FirebaseUserDocument): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngFireStore.firestore.collection(userData.accountType).doc(userData.uid).set({
                accountCreated: userData.accountCreated,
                accountType: userData.accountType,
                contactNo: userData.contactNo,
                address: userData.address,
                email: userData.email,
                firstName: userData.firstName,
                middleName: userData.middleName,
                lastName: userData.lastName,
                imageUrl: userData.imageUrl,
                uid: userData.uid
            }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    sendEmailVerification(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngAuth.auth.currentUser.sendEmailVerification()
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    removeUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngAuth.auth.currentUser.delete()
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    authenticateUser(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngAuth.auth.signInWithEmailAndPassword(email, password)
                .then((response) => {
                    this.ngAuth.auth.onAuthStateChanged((user) => {
                        user ? this._user.isSignedIn = true : this._user.isSignedIn = false;
                    });
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getUserData(userUID: string, accountType: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.ngFireStore.collection(accountType).doc(userUID).valueChanges()
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
                foodMenu: this._user.foodOutletData.foodMenu
            }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

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
}