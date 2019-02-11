export class AccountType {
    accountTypeName: string;
    accountTypeID: string;
}

export class SignUpData {
	accountType: string;
	contactNo: string;
	address: string[];
	email: string;
	firstName: string;
	middleName: string;
	lastName: string;
    imageUrl: string;
    password: string;
    confirmPassword: string;
}