export class AccountCreated {
	seconds: number;
	nanoseconds: number;
}

export class FirebaseUserDocument {
	accountCreated: AccountCreated;
	accountType: string;
	contactNo: string;
	deliveryAddress: string;
	email: string;
	fullName: string;
	imageUrl: string;
	uid: string;
}