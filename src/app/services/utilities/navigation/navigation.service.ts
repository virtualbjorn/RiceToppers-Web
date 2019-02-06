import { Injectable } from "@angular/core";
import { NavigationExtras, Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable()
export class NavigationService {
  isLoading: boolean = false;
  constructor(private _router: Router, private _route: ActivatedRoute) {
    _router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.showLoader();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.hideLoader();
          break;
        }
        default: { break; }
      }
    });
  }

  showLoader() {
    $('html, body').animate({ scrollTop: 0 }, 0);
    $('html, body').addClass('scroll-disable');
    this.isLoading = true;
  }

  hideLoader() {
    setTimeout(() => {
      $('html, body').removeClass('scroll-disable');
      this.isLoading = false;
    }, 1000);
  }

  public navigateToHome() {
    this._router.navigate(['../home'], { relativeTo: this._route })
  }

  public navigateToAboutUs() {
    this._router.navigate(['../about-us'], { relativeTo: this._route })
  }

  public navigateToFoodOutlet() {
    this._router.navigate(['../food-outlet'], { relativeTo: this._route })
  }

  public navigateToLogin() {
    this._router.navigate(['../login'], { relativeTo: this._route })
  }

  public navigateToResetPasswordPage() {
    this._router.navigate(['../reset-password'], { relativeTo: this._route })
  }

  public navigateToUserDashboard() {
    this._router.navigate(['../dashboard'], { relativeTo: this._route })
  }

  public navigateToContentLayoutSamplePage() {
    this._router.navigate(['../content-layout-sample-page'], { relativeTo: this._route })
  }
}