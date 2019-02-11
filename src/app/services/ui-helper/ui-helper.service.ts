import { Injectable } from "@angular/core";

@Injectable()
export class UIHelperService {
    loaderText: string = null;
    loaderURL: string = '../../../../assets/img/loaders/ripple-loader.gif';
    isLoading: boolean = false;

    public showLoader(loaderText?: string) {
        $('html, body').animate({ scrollTop: 0 }, 0);
        $('html, body').addClass('scroll-disable');
        this.loaderText = loaderText;
        this.isLoading = true;
    }

    public hideLoader() {
        setTimeout(() => {
            $('html, body').removeClass('scroll-disable');
            this.isLoading = false;
        }, 1000);
    }

    public titleCase(str: string): string {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    public commaFormattedNumbers(amount: string): string {
        var delimiter = ","; // replace comma if desired
        let a = amount.split('.', 2)
        var d = a[1];
        var i = parseInt(a[0]);
        if (isNaN(i)) { return ''; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        let n: string = i.toString();
        a = [];
        while (n.length > 3) {
            var nn = n.substr(n.length - 3);
            a.unshift(nn);
            n = n.substr(0, n.length - 3);
        }
        if (n.length > 0) { a.unshift(n); }
        n = a.join(delimiter);
        if (d.length < 1) { amount = n; }
        else { amount = n + '.' + d; }
        amount = minus + amount;
        return amount;
    }
}