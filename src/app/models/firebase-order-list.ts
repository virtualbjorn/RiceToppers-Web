export class OrderList {
    customerRef: any;
    orderStatus: string;
    orderData: OrderData[];
    orderType: string;
    userData: {
        contactNo: string,
        name: string,
        deliveryAddress: string
    }
    id: string;
    timecreated: any;
    totalAmountPayable: number;
}
export class OrderData {
    productName: string;
    productPrice: number;
    piecesToOrder: number;
    totalPrice: number;
    foodItemIndex: number[];
}