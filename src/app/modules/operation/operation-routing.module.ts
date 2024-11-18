import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FoodListComponent } from './food-list/food-list.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { ViewFoodComponent } from './view-food/view-food.component';

const routes: Routes = [
  { path: '', component: ShopPageComponent },
  { path: 'view-product/:id', component: ViewFoodComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'list', component: FoodListComponent },
  { path: 'cart', component: CartPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
