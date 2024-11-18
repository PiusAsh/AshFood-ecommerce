import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationRoutingModule } from './operation-routing.module';
import { ViewFoodComponent } from './view-food/view-food.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FoodListComponent } from './food-list/food-list.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    ViewFoodComponent,
    CheckoutComponent,
    CartPageComponent,
    FoodListComponent,
    ShopPageComponent,
  ],
  imports: [CommonModule, OperationRoutingModule, SharedModule],
})
export class OperationModule {}
