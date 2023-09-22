import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { ServiceComponent } from './Pages/service/service.component';
import { FAQComponent } from './Pages/faq/faq.component';
import { AuthGuard } from './auth/Guard/auth-guard.guard';
import { CheckoutComponent } from './Operation/checkout/checkout.component';
import { FoodListComponent } from './Operation/food-list/food-list.component';
import { ViewFoodComponent } from './Operation/view-food/view-food.component';
import { CartPageComponent } from './Operation/cart-page/cart-page.component';
import { ShopPageComponent } from './Operation/shop-page/shop-page.component';
import { ContactPageComponent } from './Pages/contact-page/contact-page.component';
import { MenuPageComponent } from './Pages/menu-page/menu-page.component';
import { SearchResultPageComponent } from './Pages/search-result-page/search-result-page.component';


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: "search/:searchTerm", component: SearchResultPageComponent
  },
  { path: 'about-us', component: AboutComponent },
  { path: 'contact-us', component: ContactPageComponent },
  { path: 'our-menu', component: MenuPageComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'view-food/:id', component: ViewFoodComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'list', component: FoodListComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'shop', component: ShopPageComponent },

 
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
