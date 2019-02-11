import { Component, Input } from "@angular/core";
import { UIHelperService } from 'app/services/ui-helper/ui-helper.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    constructor(public _uiHelper: UIHelperService) { }

    @Input() loaderUrl: string = '';
    @Input('loading') isLoading: boolean = false;
}