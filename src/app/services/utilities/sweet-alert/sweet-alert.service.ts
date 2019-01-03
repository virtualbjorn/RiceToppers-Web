import { Injectable, ViewContainerRef } from '@angular/core';
import { SweetAlertType } from 'sweetalert2'
import swal from 'sweetalert2'

@Injectable()
export class SweetAlertService {
    constructor() { }

    alertSuccess(message: string, title: string = "") {
        swal(title, message, "success");
    }

    alertError(message: string, title: string = "") {
        swal(title, message, "error");
    }

    alertWarning(message: string, title: string = "") {
        swal(title, message, "warning");
    }

    alertInfo(message: string, title: string = "") {
        swal(title, message, "info");
    }

    alertQuestion(message: string, title: string = "") {
        swal(title, message, "question");
    }
}