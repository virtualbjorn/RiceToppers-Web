import { Component, Input } from "@angular/core";
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    constructor(public _navigationService: NavigationService) { }

    @Input() loaderUrl: string = '';
    @Input('loading') isLoading: boolean = false;
}