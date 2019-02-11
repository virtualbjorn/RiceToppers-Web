import { Injectable } from "@angular/core";
import { NavigationExtras, Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { UIHelperService } from 'app/services/ui-helper/ui-helper.service';

@Injectable()
export class NavigationService {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _uiHelper: UIHelperService
  ) {
    _router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this._uiHelper.showLoader();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this._uiHelper.hideLoader();
          break;
        }
        default: { break; }
      }
    });
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

  public navigateToSignUp() {
    this._router.navigate(['../sign-up'], { relativeTo: this._route })
  }
}