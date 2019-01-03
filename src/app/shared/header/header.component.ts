import { Component, HostBinding } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    isLoggedIn: boolean = false;
    username: string = "Bryan";

    showDropdown() {
        $('#dropdown').toggleClass('dropdown');
        $('.profile-pic-container').toggleClass('dropdown');
        $('.angle-down').toggleClass('active');
    }
}
