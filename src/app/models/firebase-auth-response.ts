
export class ProviderData {
	uid: string;
	displayName?: any;
	photoURL?: any;
	email: string;
	phoneNumber?: any;
	providerId: string;
}

export class StsTokenManager {
	apiKey: string;
	refreshToken: string;
	accessToken: string;
	expirationTime: number;
}

export class User {
	uid: string;
	displayName?: any;
	photoURL?: any;
	email: string;
	emailVerified: boolean;
	phoneNumber?: any;
	isAnonymous: boolean;
	providerData: ProviderData[];
	apiKey: string;
	appName: string;
	authDomain: string;
	stsTokenManager: StsTokenManager;
	redirectEventId?: any;
	lastLoginAt: string;
	createdAt: string;
}

export class AdditionalUserInfo {
	providerId: string;
	isNewUser: boolean;
}

export class FirebaseAuthResponse {
	user: User;
	credential?: any;
	additionalUserInfo: AdditionalUserInfo;
	operationType: string;
}