import { Component, HostBinding } from '@angular/core';
import { NavigationService } from 'app/services/utilities/navigation/navigation.service';

@Component({
    // moduleId: module.id,
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
    constructor(public _navigation: NavigationService) { }
    currentDate: Date = new Date();
}
