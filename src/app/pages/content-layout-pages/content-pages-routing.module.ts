import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FoodOutletComponent } from './food-outlet/food-outlet.component';

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
          title: 'Food Outlet Component'
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
