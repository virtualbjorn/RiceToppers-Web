import { Component, OnInit } from '@angular/core';
import { OrderList } from 'app/models/firebase-order-list';
import { FirebaseAPIService } from 'app/services/firebase-api/firebase-api.service';
import { SweetAlertService } from 'app/services/utilities/sweet-alert/sweet-alert.service';
import { UIHelperService } from 'app/services/ui-helper/ui-helper.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    isLoading: boolean = false;
    orderList: OrderList[] = [];
    currentFilter: string = 'All';

    constructor(
        private _ngFire: FirebaseAPIService,
        private _sweetAlert: SweetAlertService,
        private _uiHelper: UIHelperService
    ) { }

    ngOnInit() {
        this.updateOrderList();
    }

    async updateOrderList() {
        this.isLoading = true;
        this._uiHelper.showLoader();
        this.orderList = await this._ngFire.getOrderList();
        this.orderList.sort((a, b) => ((a.orderStatus == 'Confirmed' && b.orderStatus != 'Confirmed') || (a.orderStatus == 'Pending' && b.orderStatus != 'Pending')) ? -1 : 1);
        if (this.orderList.length) {
            this._uiHelper.hideLoader();
            this.isLoading = false;
        }
    }

    async updateOrderStatus(id: string, orderStatus: string) {
        this.isLoading = true; this._uiHelper.showLoader();

        let orderStatusUpdateResponse = await this._ngFire.updateOrderStatus(id, orderStatus);
        if (orderStatusUpdateResponse.success) {
            this.isLoading = false;
            this._uiHelper.hideLoader();
            this._sweetAlert.alertSuccess(orderStatusUpdateResponse.message);
        }
    }

    onFilter(filter: string) {
        this.currentFilter = filter;
    }
}
