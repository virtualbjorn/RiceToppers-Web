import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutPageComponent } from './content-layout-page/content-layout-page.component';
import { LoginPageComponent } from './login/login.component';
import { ResetPasswordPageComponent } from './reset-password/reset-password.component';
import { HomePageComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent,
        data: {
          title: 'Reset Password'
        }
      },
      {
        path: 'content-layout-sample-page',
        component: ContentLayoutPageComponent,
        data: {
          title: 'Content Layout Sample Page'
        }
      },
      {
        path: 'home',
        component: HomePageComponent,
        data: {
          title: 'Home'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
