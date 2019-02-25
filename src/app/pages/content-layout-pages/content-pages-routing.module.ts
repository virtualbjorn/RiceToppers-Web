import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FoodOutletComponent } from './food-outlet/food-outlet.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DataLogComponent } from './data-log/data-log.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        data: {
          title: 'About Us'
        }
      },
      {
        path: 'food-outlet',
        component: FoodOutletComponent,
        data: {
          title: 'Food Outlet'
        }
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
          title: 'Sign Up'
        }
      },
      {
        path: 'order-list',
        component: OrderListComponent,
        data: {
          title: 'Order List'
        }
      },
      // {
      //   path: 'data-log',
      //   component: DataLogComponent,
      //   data: {
      //     title: 'Data Log'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
