import { Injectable } from "@angular/core";
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(private _router: Router, private _route: ActivatedRoute) {}

  public navigateToHome() {
    this._router.navigate(['../home'], { relativeTo: this._route })
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