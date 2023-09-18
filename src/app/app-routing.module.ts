import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { RoomsComponent } from './Pages/rooms/rooms.component';
import { ServiceComponent } from './Pages/service/service.component';
import { FAQComponent } from './Pages/faq/faq.component';
import { AuthGuard } from './auth/Guard/auth-guard.guard';
import { CheckoutComponent } from './Operation/checkout/checkout.component';
import { FoodListComponent } from './Operation/food-list/food-list.component';
import { ViewFoodComponent } from './Operation/view-food/view-food.component';
import { CartPageComponent } from './Operation/cart-page/cart-page.component';


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: "search/:searchTerm", component: HomeComponent
  },
  { path: 'about', component: AboutComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'view-food/:id', component: ViewFoodComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'list', component: FoodListComponent },
  { path: 'cart', component: CartPageComponent },

 
  // { path: '**', component: PageNotFoundComponent },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./Admin-Panel/admin/admin.module').then((m) => m.AdminModule),
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
