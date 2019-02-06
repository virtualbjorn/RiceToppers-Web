export class FoodDetail {
	fN: string;
	fPC: number;
	fPS: number;
	fd: string;
	iA: boolean;
}

export class FirebaseFoodOutletDocument {
	foodProviderData: any;
	foodMenu: FoodDetail[];
}
